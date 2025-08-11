# NextAuth.js Authentication Guide

## 🔐 Authentication Implementation

This LMS project uses NextAuth.js for authentication with the following features:

### **Features Implemented:**

1. **Credentials Provider**: Email/password authentication
2. **Prisma Adapter**: Database integration
3. **JWT Sessions**: Secure session management
4. **Route Protection**: Middleware-based route protection
5. **Custom Hooks**: Easy authentication state management

## 📁 **File Structure**

```
my-app/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts          # NextAuth API route
│   │   ├── login/
│   │   │   └── route.ts              # Login API
│   │   └── register/
│   │       └── route.ts              # Registration API
│   └── layout.tsx                    # Root layout with SessionProvider
├── components/
│   └── providers/
│       └── SessionProvider.tsx       # NextAuth session provider
├── hooks/
│   └── useAuth.ts                    # Custom authentication hook
├── lib/
│   ├── auth.ts                       # NextAuth configuration
│   └── prisma.ts                     # Prisma client
├── middleware.ts                     # Route protection middleware
└── env.example                       # Environment variables template
```

## 🔧 **Setup Instructions**

### **1. Environment Variables**

Create a `.env.local` file in the `my-app` directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/lms_db"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### **2. Generate Secret Key**

Generate a secure secret key:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or use a secure random string
```

### **3. Database Setup**

```bash
# Generate Prisma client
npx prisma generate --schema=../prisma/schema.prisma

# Push schema to database
npx prisma db push --schema=../prisma/schema.prisma
```

## 🚀 **Usage Examples**

### **1. Using the useAuth Hook**

```typescript
"use client";

import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { login, isAuthenticated, user, isLoading } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    const result = await login(email, password);
    
    if (result.success) {
      // Redirect to dashboard
      router.push("/dashboard");
    } else {
      // Handle error
      console.error(result.error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isAuthenticated) return <div>Welcome, {user?.name}!</div>;

  return (
    <form onSubmit={handleSubmit}>
      {/* Login form */}
    </form>
  );
}
```

### **2. Protected Routes**

```typescript
// This route is automatically protected by middleware
export default function DashboardPage() {
  const { user } = useAuth();
  
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.name}!</p>
      <p>Role: {user?.role}</p>
    </div>
  );
}
```

### **3. Server-Side Authentication**

```typescript
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function ServerComponent() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return <div>Not authenticated</div>;
  }
  
  return <div>Welcome, {session.user.name}!</div>;
}
```

## 🔒 **Security Features**

### **1. Password Security**
- Bcrypt hashing with 12 salt rounds
- Secure password comparison
- No plain text password storage

### **2. Session Security**
- JWT-based sessions
- Secure session tokens
- Automatic session expiration

### **3. Route Protection**
- Middleware-based protection
- Automatic redirects for unauthenticated users
- Role-based access control support

### **4. Input Validation**
- Zod schema validation
- Email format validation
- Password strength requirements

## 📡 **API Endpoints**

### **1. NextAuth.js Endpoints**
- `GET /api/auth/signin` - Sign in page
- `POST /api/auth/signin` - Sign in API
- `GET /api/auth/signout` - Sign out
- `GET /api/auth/session` - Get current session

### **2. Custom Endpoints**
- `POST /api/register` - User registration
- `POST /api/login` - Custom login API

## 🛡️ **Middleware Protection**

The middleware automatically protects:
- `/dashboard/*` - Requires authentication
- `/login` - Redirects authenticated users to dashboard
- `/register` - Redirects authenticated users to dashboard

## 🔄 **Authentication Flow**

1. **Registration**: User registers via `/api/register`
2. **Login**: User logs in via NextAuth.js credentials provider
3. **Session**: JWT session is created and stored
4. **Protection**: Middleware protects routes automatically
5. **Logout**: User logs out and session is destroyed

## 🎯 **Next Steps**

### **Planned Features:**
- [ ] Social login providers (Google, GitHub)
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Two-factor authentication
- [ ] Role-based route protection
- [ ] Admin panel authentication

### **Integration Points:**
- Course enrollment system
- Quiz taking system
- Progress tracking
- Feedback system

## 🧪 **Testing**

### **Test Authentication:**
1. Start the development server
2. Navigate to `/register` to create an account
3. Navigate to `/login` to sign in
4. Access `/dashboard` to verify protection

### **Test API Endpoints:**
```bash
# Register a user
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","role":"STUDENT"}'

# Login
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

---

**Note**: Make sure to set up your database and environment variables before testing the authentication system. 