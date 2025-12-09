
import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
// import { ChatRepository } from '@/lib/database'; // Uncomment if you want to save chat history

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const LMS_INFO = `
CREATOR LMS - PLATFORM INFORMATION

=== OVERVIEW ===
Creator LMS is a modern Learning Management System for educational institutions, teachers, and students. It provides course management, user roles, analytics, and secure authentication.

=== FEATURES ===
1. Course Management (create, edit, enroll)
2. Teacher & Student Dashboards
3. Secure Authentication & Role-based Access
4. Payment Integration (Stripe, Razorpay)
5. Admin Controls & Reporting
6. Collaboration Tools (chat, forums)
7. Mobile-friendly UI
8. Legal Compliance & Copyright Protection
9. 24/7 Support

=== TECHNOLOGY STACK ===
- Frontend: Next.js, React, TypeScript
- Backend: Node.js, Prisma ORM
- Database: PostgreSQL
- Payment: Stripe, Razorpay
- Cloud: Vercel, AWS

=== WHY CHOOSE CREATOR LMS ===
✓ Modern, scalable architecture
✓ Secure authentication
✓ Role-based dashboards
✓ Payment integration
✓ Legal compliance
✓ 24/7 support
✓ Customizable for institutions

=== CONTACT ===
Contact: info@creatorlms.com
Support: 24/7
Website: https://creatorlms.com
Location: India
`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationHistory = [], sessionId } = body;

    console.log('[Chatbot] Incoming message:', message);
    if (!message || typeof message !== 'string') {
      console.log('[Chatbot] No message provided');
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }

    const messages = [
      {
        role: 'system',
        content: `You are the official AI assistant for Creator LMS, a modern Learning Management System for institutions, teachers, and students.\n\nSTRICT GUIDELINES:\n1. ONLY answer questions about Creator LMS - features, course management, dashboards, authentication, payment, legal compliance, support, and platform details.\n2. If asked about ANY other topic (weather, news, other companies, general knowledge, recipes, politics, etc.), politely decline and redirect to LMS features.\n3. Use ONLY the platform information provided below. Do not invent information.\n4. If specific pricing or details are not available, suggest contacting support.\n5. Be professional, helpful, and concise.\n6. Emphasize key benefits: secure, scalable, modern, 24/7 support.\n7. Always encourage users to contact support for details.\n8. IMPORTANT: User is already ON the LMS, so say things like "You can use the support form on this page" NOT "Visit our website".\n\n${LMS_INFO}\n\nRemember: You represent Creator LMS. Focus exclusively on helping users understand LMS features and support.`,
      },
      ...conversationHistory,
      {
        role: 'user',
        content: message,
      },
    ];

    console.log('[Chatbot] Sending to Groq:', JSON.stringify(messages));
    let completion;
    try {
      completion = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: messages as any,
        temperature: 0.3,
        max_tokens: 1024,
      });
      console.log('[Chatbot] Groq response:', completion);
    } catch (groqError) {
      console.error('[Chatbot] Groq API error:', groqError);
      return NextResponse.json(
        { success: false, error: 'Groq API error', details: groqError?.message || groqError },
        { status: 500 }
      );
    }

    const reply = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    console.log('[Chatbot] Reply:', reply);

    // Extract keywords from user message for analytics
    const keywords = extractKeywords(message);

    // Get user info
    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                      request.headers.get('x-real-ip') || 
                      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Uncomment below to save chat history
    // try {
    //   await ChatRepository.saveConversation({
    //     sessionId: sessionId || `session_${Date.now()}`,
    //     userMessage: message,
    //     botResponse: reply,
    //     keywords,
    //     ipAddress,
    //     userAgent,
    //   });
    // } catch (dbError) {
    //   console.error('[Chatbot] Database save failed:', dbError);
    // }

    return NextResponse.json({
      success: true,
      message: reply,
      groqRaw: completion
    });
  } catch (error) {
    console.error('[Chatbot] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process message' },
      { status: 500 }
    );
  }
}

// Helper function to extract keywords
function extractKeywords(message: string): string[] {
  const keywords: string[] = [];
  const lowercaseMsg = message.toLowerCase();

  const keywordMap: Record<string, string> = {
    'course': 'course_management',
    'enroll': 'course_enrollment',
    'teacher': 'teacher_dashboard',
    'student': 'student_dashboard',
    'admin': 'admin_dashboard',
    'dashboard': 'dashboard',
    'login': 'authentication',
    'signup': 'authentication',
    'auth': 'authentication',
    'payment': 'payment_integration',
    'stripe': 'payment_integration',
    'razorpay': 'payment_integration',
    'legal': 'legal_compliance',
    'copyright': 'legal_compliance',
    'support': 'support',
    'mobile': 'mobile_ui',
    'collaboration': 'collaboration_tools',
    'chat': 'collaboration_tools',
    'forum': 'collaboration_tools',
    'report': 'reporting',
    'analytics': 'reporting',
    'feature': 'features',
    'about': 'about_platform',
  };

  for (const [key, value] of Object.entries(keywordMap)) {
    if (lowercaseMsg.includes(key) && !keywords.includes(value)) {
      keywords.push(value);
    }
  }

  return keywords.length > 0 ? keywords : ['general_inquiry'];
}
