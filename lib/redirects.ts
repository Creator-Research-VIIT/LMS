export function getRoleBasedDashboard(role: string, approvalStatus?: string): string {
  switch (role) {
    case 'ADMIN':
      return '/admin'
    case 'TEACHER':
      // Teachers need approval before accessing full dashboard
      return approvalStatus === 'approved' ? '/teacher' : '/teacher-approval'
    case 'CHARITY':
      return '/charity'
    case 'STUDENT':
    default:
      return '/student'
  }
}

export function getWelcomeMessage(role: string, approvalStatus?: string): string {
  switch (role) {
    case 'ADMIN':
      return 'Welcome to the admin dashboard!'
    case 'TEACHER':
      if (approvalStatus === 'pending') {
        return 'Your teacher account is pending approval. You will be notified once approved.'
      }
      return 'Welcome to your teaching dashboard!'
    case 'CHARITY':
      return 'Welcome to your charity dashboard!'
    case 'STUDENT':
    default:
      return 'Welcome to your learning dashboard!'
  }
}