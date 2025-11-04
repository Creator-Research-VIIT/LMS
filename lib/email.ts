import { prisma } from '@/lib/prisma'
import nodemailer from 'nodemailer'

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('⚠️ Email configuration missing in deployment environment.')
    console.warn('📋 Required environment variables: EMAIL_HOST, EMAIL_USER, EMAIL_PASS')
    console.warn('🔧 Please set these in your deployment platform (Vercel, Netlify, etc.)')
    return null
  }
  
  console.log('📧 Creating email transporter for environment:', process.env.NODE_ENV)
  
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // Use TLS
    requireTLS: true, // Require TLS for security
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // Add deployment-specific settings
    connectionTimeout: 60000, // 60 seconds
    greetingTimeout: 30000,   // 30 seconds  
    socketTimeout: 60000,     // 60 seconds
  })
}

/**
 * Get all admin email addresses from the database
 */
async function getAdminEmails(): Promise<string[]> {
  try {
    const admins = await prisma.user.findMany({
      where: { 
        role: 'ADMIN',
        emailVerified: { not: null } // Only send to verified admins
      },
      select: { email: true }
    })
    
    const adminEmails = admins.map(admin => admin.email).filter(email => email)
    
    // Fallback to environment variable if no admins found in database
    if (adminEmails.length === 0) {
      const fallbackEmail = process.env.ADMIN_EMAIL || 'admin@learnhub.com'
      console.warn(`No admin users found in database. Using fallback email: ${fallbackEmail}`)
      return [fallbackEmail]
    }
    
    return adminEmails
  } catch (error) {
    console.error('Failed to fetch admin emails:', error)
    // Fallback to environment variable
    return [process.env.ADMIN_EMAIL || 'admin@learnhub.com']
  }
}

/**
 * Send teacher application confirmation email
 */
export async function sendTeacherApplicationConfirmation(email: string, name: string): Promise<boolean> {
  const transporter = createTransporter()
  
  // If no email configuration, fall back to console logging for development
  if (!transporter) {
    console.log(`
📧 TEACHER APPLICATION CONFIRMATION (Development Mode)
To: ${email}
Teacher: ${name}
Status: Application submitted for review
    `)
    return true
  }
  
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'Teacher Application Received - LearnHub',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">📚 LearnHub</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Teacher Application</p>
          </div>
          
          <div style="padding: 40px 30px; background: #f8f9fa;">
            <h2 style="color: #333; margin-bottom: 20px;">Application Received!</h2>
            <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
              Dear ${name},
            </p>
            <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
              Thank you for applying to become a teacher on LearnHub! We have received your application and it is currently under review.
            </p>
            
            <div style="background: white; border-left: 4px solid #28a745; border-radius: 8px; padding: 25px; margin: 30px 0;">
              <h3 style="color: #28a745; margin: 0 0 15px 0; font-size: 18px;">✅ What's Next?</h3>
              <ul style="color: #666; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>Our admin team will review your application</li>
                <li>You'll receive an email notification once approved</li>
                <li>Approval typically takes 1-2 business days</li>
                <li>You can browse courses as a student while waiting</li>
              </ul>
            </div>
            
            <div style="background: #e3f2fd; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h4 style="color: #1976d2; margin: 0 0 10px 0;">📞 Need Help?</h4>
              <p style="color: #666; margin: 0; font-size: 14px;">
                If you have any questions, contact us at 
                <a href="mailto:support@learnhub.com" style="color: #1976d2;">support@learnhub.com</a>
              </p>
            </div>
          </div>
          
          <div style="background: #343a40; padding: 20px; text-align: center;">
            <p style="color: #adb5bd; margin: 0; font-size: 14px;">
              © 2024 LearnHub. All rights reserved.
            </p>
          </div>
        </div>
      `,
      text: `
LearnHub - Teacher Application Received

Dear ${name},

Thank you for applying to become a teacher on LearnHub! We have received your application and it is currently under review.

What's Next:
- Our admin team will review your application
- You'll receive an email notification once approved
- Approval typically takes 1-2 business days
- You can browse courses as a student while waiting

Need Help?
If you have any questions, contact us at support@learnhub.com

© 2024 LearnHub. All rights reserved.
      `
    }
    
    await transporter.sendMail(mailOptions)
    console.log(`✅ Teacher application confirmation sent to ${email}`)
    return true
    
  } catch (error) {
    console.error('❌ Failed to send teacher application confirmation:', error)
    
    // Fall back to console logging if email fails
    console.log(`
📧 TEACHER APPLICATION CONFIRMATION (Fallback - Email Failed)
To: ${email}
Teacher: ${name}
Status: Application submitted for review
Error: ${error instanceof Error ? error.message : 'Unknown error'}
    `)
    return false
  }
}

/**
 * Send admin notification for new teacher application
 */
export async function sendTeacherApplicationNotification(teacherEmail: string, teacherName: string): Promise<boolean> {
  const transporter = createTransporter()
  const adminEmails = await getAdminEmails()
  
  // If no email configuration, fall back to console logging for development
  if (!transporter) {
    console.log(`
🔔 ADMIN NOTIFICATION (Development Mode)
To: ${adminEmails.join(', ')}
New Teacher Application:
- Name: ${teacherName}
- Email: ${teacherEmail}
- Status: Pending approval
    `)
    return true
  }
  
  let successCount = 0
  const errors: string[] = []
  
  // Send email to each admin
  for (const adminEmail of adminEmails) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: adminEmail,
        subject: `New Teacher Application - ${teacherName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); padding: 30px; text-align: center; color: white;">
              <h1 style="margin: 0; font-size: 28px;">📚 LearnHub Admin</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px;">Teacher Application Alert</p>
            </div>
            
            <div style="padding: 40px 30px; background: #f8f9fa;">
              <h2 style="color: #333; margin-bottom: 20px;">🆕 New Teacher Application</h2>
              <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
                A new user has applied to become a teacher and requires your approval.
              </p>
              
              <div style="background: white; border: 2px solid #e9ecef; border-radius: 8px; padding: 25px; margin: 30px 0;">
                <h3 style="color: #333; margin: 0 0 20px 0;">👨‍🏫 Teacher Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-weight: bold;">Name:</td>
                    <td style="padding: 8px 0; color: #333;">${teacherName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-weight: bold;">Email:</td>
                    <td style="padding: 8px 0; color: #333;">${teacherEmail}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-weight: bold;">Status:</td>
                    <td style="padding: 8px 0; color: #f39c12; font-weight: bold;">⏳ Pending Approval</td>
                  </tr>
                </table>
              </div>
              
              <div style="background: #fff3cd; border: 1px solid #ffeeba; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h4 style="color: #856404; margin: 0 0 10px 0;">⚡ Action Required</h4>
                <p style="color: #856404; margin: 0; font-size: 14px;">
                  Please log into the admin dashboard to review and approve this teacher application.
                </p>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/dashboard" 
                   style="background: #28a745; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
                  Review Application
                </a>
              </div>
            </div>
            
            <div style="background: #343a40; padding: 20px; text-align: center;">
              <p style="color: #adb5bd; margin: 0; font-size: 14px;">
                © 2024 LearnHub Admin Portal. All rights reserved.
              </p>
            </div>
          </div>
        `,
        text: `
LearnHub Admin - New Teacher Application

A new user has applied to become a teacher and requires your approval.

Teacher Details:
- Name: ${teacherName}
- Email: ${teacherEmail}
- Status: Pending Approval

Action Required:
Please log into the admin dashboard to review and approve this teacher application.

Review at: ${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/dashboard

© 2024 LearnHub Admin Portal. All rights reserved.
        `
      }
      
      await transporter.sendMail(mailOptions)
      console.log(`✅ Teacher notification sent to admin: ${adminEmail}`)
      successCount++
      
    } catch (error) {
      console.error(`❌ Failed to send teacher notification to ${adminEmail}:`, error)
      errors.push(`${adminEmail}: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
  
  // Log summary
  if (successCount > 0) {
    console.log(`✅ Teacher application notification sent to ${successCount}/${adminEmails.length} admins`)
  }
  
  if (errors.length > 0) {
    console.log(`⚠️ Failed to send to some admins:`, errors)
    
    // Fall back to console logging for failed emails
    console.log(`
🔔 TEACHER APPLICATION NOTIFICATION (Fallback - Some Emails Failed)
To: ${adminEmails.join(', ')}
New Teacher Application:
- Name: ${teacherName}
- Email: ${teacherEmail}
- Status: Pending approval
Errors: ${errors.join('; ')}
    `)
  }
  
  // Return true if at least one email was sent successfully
  return successCount > 0
}

/**
 * Send admin notification for new course submission
 */
export async function sendCourseSubmissionNotification(
  courseTitle: string, 
  teacherName: string, 
  teacherEmail: string,
  courseId: string
): Promise<boolean> {
  const transporter = createTransporter()
  const adminEmails = await getAdminEmails()
  
  // If no email configuration, fall back to console logging for development
  if (!transporter) {
    console.log(`
🔔 COURSE SUBMISSION NOTIFICATION (Development Mode)
To: ${adminEmails.join(', ')}
Course: ${courseTitle}
Teacher: ${teacherName} (${teacherEmail})
Course ID: ${courseId}
Status: Pending approval
    `)
    return true
  }
  
  let successCount = 0
  const errors: string[] = []
  
  // Send email to each admin
  for (const adminEmail of adminEmails) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: adminEmail,
        subject: `New Course Submission - ${courseTitle}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%); padding: 30px; text-align: center; color: white;">
              <h1 style="margin: 0; font-size: 28px;">📚 LearnHub Admin</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px;">Course Submission Alert</p>
            </div>
            
            <div style="padding: 40px 30px; background: #f8f9fa;">
              <h2 style="color: #333; margin-bottom: 20px;">📖 New Course Submitted</h2>
              <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
                A teacher has submitted a new course for approval and it requires your review.
              </p>
              
              <div style="background: white; border: 2px solid #e9ecef; border-radius: 8px; padding: 25px; margin: 30px 0;">
                <h3 style="color: #333; margin: 0 0 20px 0;">📚 Course Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-weight: bold;">Course Title:</td>
                    <td style="padding: 8px 0; color: #333;">${courseTitle}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-weight: bold;">Teacher:</td>
                    <td style="padding: 8px 0; color: #333;">${teacherName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-weight: bold;">Teacher Email:</td>
                    <td style="padding: 8px 0; color: #333;">${teacherEmail}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666; font-weight: bold;">Status:</td>
                    <td style="padding: 8px 0; color: #f39c12; font-weight: bold;">⏳ Pending Approval</td>
                  </tr>
                </table>
              </div>
              
              <div style="background: #fff3cd; border: 1px solid #ffeeba; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h4 style="color: #856404; margin: 0 0 10px 0;">⚡ Action Required</h4>
                <p style="color: #856404; margin: 0; font-size: 14px;">
                  Please log into the admin dashboard to review and approve this course.
                </p>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/dashboard" 
                   style="background: #4caf50; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
                  Review Course
                </a>
              </div>
            </div>
            
            <div style="background: #343a40; padding: 20px; text-align: center;">
              <p style="color: #adb5bd; margin: 0; font-size: 14px;">
                © 2024 LearnHub Admin Portal. All rights reserved.
              </p>
            </div>
          </div>
        `,
        text: `
LearnHub Admin - New Course Submission

A teacher has submitted a new course for approval and it requires your review.

Course Details:
- Course Title: ${courseTitle}
- Teacher: ${teacherName}
- Teacher Email: ${teacherEmail}
- Status: Pending Approval

Action Required:
Please log into the admin dashboard to review and approve this course.

Review at: ${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/dashboard

© 2024 LearnHub Admin Portal. All rights reserved.
        `
      }
      
      await transporter.sendMail(mailOptions)
      console.log(`✅ Course submission notification sent to admin: ${adminEmail}`)
      successCount++
      
    } catch (error) {
      console.error(`❌ Failed to send course notification to ${adminEmail}:`, error)
      errors.push(`${adminEmail}: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
  
  // Log summary
  if (successCount > 0) {
    console.log(`✅ Course submission notification sent to ${successCount}/${adminEmails.length} admins`)
  }
  
  if (errors.length > 0) {
    console.log(`⚠️ Failed to send to some admins:`, errors)
    
    // Fall back to console logging for failed emails
    console.log(`
🔔 COURSE SUBMISSION NOTIFICATION (Fallback - Some Emails Failed)
To: ${adminEmails.join(', ')}
Course: ${courseTitle}
Teacher: ${teacherName} (${teacherEmail})
Status: Pending approval
Errors: ${errors.join('; ')}
    `)
  }
  
  // Return true if at least one email was sent successfully
  return successCount > 0
}

/**
 * Send course approval/rejection notification to teacher
 */
export async function sendCourseApprovalNotification(
  courseTitle: string,
  teacherEmail: string,
  teacherName: string,
  status: 'approved' | 'rejected',
  adminMessage?: string
): Promise<boolean> {
  const transporter = createTransporter()
  
  // If no email configuration, fall back to console logging for development
  if (!transporter) {
    console.log(`
📧 COURSE ${status.toUpperCase()} NOTIFICATION (Development Mode)
To: ${teacherEmail}
Teacher: ${teacherName}
Course: ${courseTitle}
Status: ${status}
Message: ${adminMessage || 'No message provided'}
    `)
    return true
  }
  
  const isApproved = status === 'approved'
  const statusColor = isApproved ? '#28a745' : '#dc3545'
  const statusIcon = isApproved ? '✅' : '❌'
  const statusText = isApproved ? 'Approved' : 'Rejected'
  
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: teacherEmail,
      subject: `Course ${statusText} - ${courseTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, ${statusColor} 0%, ${statusColor}dd 100%); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">📚 LearnHub</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Course ${statusText}</p>
          </div>
          
          <div style="padding: 40px 30px; background: #f8f9fa;">
            <h2 style="color: #333; margin-bottom: 20px;">${statusIcon} Course ${statusText}!</h2>
            <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
              Dear ${teacherName},
            </p>
            <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
              Your course "<strong>${courseTitle}</strong>" has been <strong style="color: ${statusColor};">${status}</strong> by our admin team.
            </p>
            
            ${adminMessage ? `
            <div style="background: white; border-left: 4px solid ${statusColor}; border-radius: 8px; padding: 25px; margin: 30px 0;">
              <h3 style="color: ${statusColor}; margin: 0 0 15px 0; font-size: 18px;">💬 Admin Message</h3>
              <p style="color: #666; line-height: 1.6; margin: 0;">${adminMessage}</p>
            </div>
            ` : ''}
            
            ${isApproved ? `
            <div style="background: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h4 style="color: #155724; margin: 0 0 10px 0;">🎉 Congratulations!</h4>
              <p style="color: #155724; margin: 0; font-size: 14px;">
                Your course is now live and available to students. You can manage it from your teacher dashboard.
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/dashboard" 
                 style="background: #28a745; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
                Manage Course
              </a>
            </div>
            ` : `
            <div style="background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h4 style="color: #721c24; margin: 0 0 10px 0;">📝 What's Next?</h4>
              <p style="color: #721c24; margin: 0; font-size: 14px;">
                Please review the feedback and make necessary changes before resubmitting your course.
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/dashboard" 
                 style="background: #dc3545; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
                Edit Course
              </a>
            </div>
            `}
            
            <div style="background: #e3f2fd; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h4 style="color: #1976d2; margin: 0 0 10px 0;">📞 Need Help?</h4>
              <p style="color: #666; margin: 0; font-size: 14px;">
                If you have any questions, contact us at 
                <a href="mailto:support@learnhub.com" style="color: #1976d2;">support@learnhub.com</a>
              </p>
            </div>
          </div>
          
          <div style="background: #343a40; padding: 20px; text-align: center;">
            <p style="color: #adb5bd; margin: 0; font-size: 14px;">
              © 2024 LearnHub. All rights reserved.
            </p>
          </div>
        </div>
      `,
      text: `
LearnHub - Course ${statusText}

Dear ${teacherName},

Your course "${courseTitle}" has been ${status} by our admin team.

${adminMessage ? `Admin Message: ${adminMessage}` : ''}

${isApproved ? 
`Congratulations! Your course is now live and available to students. You can manage it from your teacher dashboard.

Manage your course at: ${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/dashboard` :
`Please review the feedback and make necessary changes before resubmitting your course.

Edit your course at: ${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/dashboard`
}

Need Help?
If you have any questions, contact us at support@learnhub.com

© 2024 LearnHub. All rights reserved.
      `
    }
    
    await transporter.sendMail(mailOptions)
    console.log(`✅ Course ${status} notification sent to ${teacherEmail}`)
    return true
    
  } catch (error) {
    console.error(`❌ Failed to send course ${status} notification:`, error)
    
    // Fall back to console logging if email fails
    console.log(`
📧 COURSE ${status.toUpperCase()} NOTIFICATION (Fallback - Email Failed)
To: ${teacherEmail}
Teacher: ${teacherName}
Course: ${courseTitle}
Status: ${status}
Message: ${adminMessage || 'No message provided'}
Error: ${error instanceof Error ? error.message : 'Unknown error'}
    `)
    return false
  }
}

/**
 * Send teacher approval notification to teacher
 */
export async function sendTeacherApprovalNotification(
  teacherEmail: string,
  teacherName: string,
  status: 'approved' | 'rejected',
  adminMessage?: string
): Promise<boolean> {
  const transporter = createTransporter()
  
  // If no email configuration, fall back to console logging for development
  if (!transporter) {
    console.log(`
📧 TEACHER ${status.toUpperCase()} NOTIFICATION (Development Mode)
To: ${teacherEmail}
Teacher: ${teacherName}
Status: ${status}
Message: ${adminMessage || 'No message provided'}
    `)
    return true
  }

  try {
    const isApproved = status === 'approved'
    const statusColor = isApproved ? '#28a745' : '#dc3545'
    const statusIcon = isApproved ? '✅' : '❌'
    const statusText = isApproved ? 'Approved' : 'Rejected'
    const mainHeading = isApproved ? 'Welcome to LearnHub!' : 'Application Update'
    const mainMessage = isApproved 
      ? 'Congratulations! Your teacher application has been approved and you can now start creating courses.'
      : 'Thank you for your interest in becoming a teacher. Unfortunately, your application has not been approved at this time.'

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: teacherEmail,
      subject: `Teacher Application ${statusText} - LearnHub`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, ${statusColor} 0%, ${isApproved ? '#20a029' : '#c82333'} 100%); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">📚 LearnHub</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Teacher Application ${statusText}</p>
          </div>
          
          <div style="padding: 40px 30px; background: #f8f9fa;">
            <h2 style="color: #333; margin-bottom: 20px;">${statusIcon} ${mainHeading}</h2>
            <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
              Dear ${teacherName},
            </p>
            <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
              ${mainMessage}
            </p>
            
            <div style="background: white; border-left: 4px solid ${statusColor}; border-radius: 8px; padding: 25px; margin: 30px 0;">
              <h3 style="color: ${statusColor}; margin: 0 0 15px 0; font-size: 18px;">${statusIcon} Application Status</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Teacher:</td>
                  <td style="padding: 8px 0; color: #333;">${teacherName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Email:</td>
                  <td style="padding: 8px 0; color: #333;">${teacherEmail}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Status:</td>
                  <td style="padding: 8px 0; color: ${statusColor}; font-weight: bold;">${statusIcon} ${statusText}</td>
                </tr>
              </table>
              ${adminMessage ? `
                <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 4px;">
                  <h4 style="color: #333; margin: 0 0 10px 0; font-size: 16px;">💬 Message from Admin:</h4>
                  <p style="color: #666; margin: 0; font-style: italic;">"${adminMessage}"</p>
                </div>
              ` : ''}
            </div>
            
            ${isApproved ? `
              <div style="background: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h4 style="color: #155724; margin: 0 0 10px 0;">🚀 What's Next?</h4>
                <ul style="color: #155724; line-height: 1.8; margin: 0; padding-left: 20px;">
                  <li>Log into your teacher dashboard</li>
                  <li>Create your first course</li>
                  <li>Upload course materials and videos</li>
                  <li>Start earning from your expertise!</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/teacher" 
                   style="background: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                  Go to Teacher Dashboard
                </a>
              </div>
            ` : `
              <div style="background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h4 style="color: #721c24; margin: 0 0 10px 0;">📝 Next Steps</h4>
                <ul style="color: #721c24; line-height: 1.8; margin: 0; padding-left: 20px;">
                  <li>You can continue to browse courses as a student</li>
                  <li>Feel free to reapply in the future when you meet our requirements</li>
                  <li>Contact support if you have questions about the decision</li>
                </ul>
              </div>
            `}
            
            <div style="background: #e3f2fd; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h4 style="color: #1976d2; margin: 0 0 10px 0;">📞 Need Help?</h4>
              <p style="color: #666; margin: 0; font-size: 14px;">
                If you have any questions, contact us at 
                <a href="mailto:support@learnhub.com" style="color: #1976d2;">support@learnhub.com</a>
              </p>
            </div>
          </div>
          
          <div style="background: #343a40; padding: 20px; text-align: center;">
            <p style="color: #adb5bd; margin: 0; font-size: 14px;">
              © 2024 LearnHub. All rights reserved.
            </p>
          </div>
        </div>
      `,
      text: `
LearnHub - Teacher Application ${statusText}

Dear ${teacherName},

${mainMessage}

Application Status:
- Teacher: ${teacherName}
- Email: ${teacherEmail}
- Status: ${statusText}

${adminMessage ? `Message from Admin: "${adminMessage}"` : ''}

${isApproved ? `
What's Next:
- Log into your teacher dashboard
- Create your first course
- Upload course materials and videos
- Start earning from your expertise!

Visit: ${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/teacher
` : `
Next Steps:
- You can continue to browse courses as a student
- Feel free to reapply in the future when you meet our requirements
- Contact support if you have questions about the decision
`}

Need help? Contact us at support@learnhub.com

© 2024 LearnHub. All rights reserved.
      `
    }

    await transporter.sendMail(mailOptions)
    console.log(`✅ Teacher ${status} notification sent to:`, teacherEmail)
    return true

  } catch (error) {
    console.error(`❌ Failed to send teacher ${status} notification:`, error)
    
    // Fall back to console logging if email fails
    console.log(`
📧 TEACHER ${status.toUpperCase()} NOTIFICATION (Fallback - Email Failed)
To: ${teacherEmail}
Teacher: ${teacherName}
Status: ${status}
Message: ${adminMessage || 'No message provided'}
Error: ${error instanceof Error ? error.message : 'Unknown error'}
    `)
    return false
  }
}

/**
 * Send email verification OTP to user
 */
export async function sendEmailVerificationOTP(email: string, name: string, otp: string): Promise<boolean> {
  const transporter = createTransporter()
  
  // If no email configuration, fall back to console logging for development
  if (!transporter) {
    console.log(`
📧 EMAIL VERIFICATION OTP (Development Mode)
To: ${email}
Name: ${name}
OTP: ${otp}
Expires: 30 minutes
    `)
    return true
  }
  
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email Address - LearnHub',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">🔐 LearnHub</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Email Verification</p>
          </div>
          
          <div style="padding: 40px 30px; background: #f8f9fa;">
            <h2 style="color: #333; margin-bottom: 20px;">Verify Your Email Address</h2>
            <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
              Dear ${name},
            </p>
            <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
              Thank you for registering with LearnHub! Please use the verification code below to confirm your email address:
            </p>
            
            <div style="background: white; border: 3px dashed #667eea; border-radius: 8px; padding: 30px; text-align: center; margin: 30px 0;">
              <h3 style="color: #333; margin: 0 0 15px 0;">Your Verification Code</h3>
              <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #667eea; font-family: monospace;">
                ${otp}
              </div>
            </div>
            
            <div style="background: #fff3cd; border: 1px solid #ffeeba; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h4 style="color: #856404; margin: 0 0 10px 0;">⏰ Important</h4>
              <p style="color: #856404; margin: 0; font-size: 14px;">
                This verification code will expire in 30 minutes for security reasons.
              </p>
            </div>
            
            <div style="background: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h4 style="color: #155724; margin: 0 0 10px 0;">🔒 Security Note</h4>
              <p style="color: #155724; margin: 0; font-size: 14px;">
                Never share this code with anyone. LearnHub staff will never ask for your verification code.
              </p>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-top: 30px;">
              If you didn't request this verification, please ignore this email or contact our support team.
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-top: 20px;">
              Best regards,<br>
              The LearnHub Team
            </p>
          </div>
          
          <div style="background: #343a40; padding: 20px; text-align: center;">
            <p style="color: #adb5bd; margin: 0; font-size: 14px;">
              © 2024 LearnHub. All rights reserved.
            </p>
            <p style="color: #6c757d; margin: 5px 0 0 0; font-size: 12px;">
              This is an automated message. Please do not reply to this email.
            </p>
          </div>
        </div>
      `,
      text: `
LearnHub - Email Verification

Dear ${name},

Thank you for registering with LearnHub! Please use the verification code below to confirm your email address:

VERIFICATION CODE: ${otp}

This verification code will expire in 30 minutes for security reasons.

Security Note: Never share this code with anyone. LearnHub staff will never ask for your verification code.

If you didn't request this verification, please ignore this email or contact our support team.

Best regards,
The LearnHub Team

© 2024 LearnHub. All rights reserved.
This is an automated message. Please do not reply to this email.
      `
    }

    await transporter.sendMail(mailOptions)
    console.log(`✅ Email verification OTP sent to: ${email}`)
    return true

  } catch (error) {
    console.error(`❌ Failed to send email verification OTP:`, error)
    
    // Fall back to console logging if email fails
    console.log(`
📧 EMAIL VERIFICATION OTP (Fallback - Email Failed)
To: ${email}
Name: ${name}
OTP: ${otp}
Expires: 30 minutes
Error: ${error instanceof Error ? error.message : 'Unknown error'}
    `)
    return false
  }
}
