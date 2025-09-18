import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, Mail, BookOpen } from 'lucide-react'
import Link from 'next/link'

export default function TeacherApprovalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-2xl font-bold text-gray-900 dark:text-white"
          >
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span>LearnHub</span>
          </Link>
        </div>

        {/* Approval Card */}
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Account Under Review</CardTitle>
            <CardDescription>
              Your teacher account is being reviewed by our administrators
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">What happens next?</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p>Our team will review your teacher application</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p>You'll receive an email notification once approved</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p>Approval typically takes 1-2 business days</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Need help?</span>
              </div>
              <p className="text-sm text-blue-800">
                Contact our support team at{' '}
                <a href="mailto:support@learnhub.com" className="underline">
                  support@learnhub.com
                </a>{' '}
                if you have any questions about your application.
              </p>
            </div>
            
            <div className="flex flex-col space-y-3">
              <Button asChild>
                <Link href="/">Return to Homepage</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dashboard">Browse as Student</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}