# Postman Testing Guide - LMS APIs

## 🚀 **Setup Instructions**

### **1. Base URL**
```
http://localhost:3000
```

### **2. Headers**
For all requests, add these headers:
```
Content-Type: application/json
```

## 📡 **API Endpoints to Test**

### **1. User Registration API**

#### **Endpoint**: `POST /api/register`

#### **Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "STUDENT",
  "referralCode": "optional-referral-code"
}
```

#### **Test Cases**:

**✅ Valid Registration (Student)**:
```json
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "password": "password123",
  "role": "STUDENT"
}
```

**✅ Valid Registration (Teacher)**:
```json
{
  "name": "Bob Smith",
  "email": "bob@example.com",
  "password": "password123",
  "role": "TEACHER"
}
```

**✅ Valid Registration (Admin)**:
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "password123",
  "role": "ADMIN"
}
```

**✅ Registration with Referral Code**:
```json
{
  "name": "Charlie Brown",
  "email": "charlie@example.com",
  "password": "password123",
  "role": "STUDENT",
  "referralCode": "existing-referral-code"
}
```

#### **Expected Response (201 Created)**:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid-string",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "STUDENT",
    "referralCode": "generated-uuid",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### **Error Responses**:

**400 Bad Request - Validation Error**:
```json
{
  "error": "Validation failed",
  "details": [
    {
      "code": "invalid_string",
      "message": "Invalid email",
      "path": ["email"]
    }
  ]
}
```

**400 Bad Request - Email Already Exists**:
```json
{
  "error": "User with this email already exists"
}
```

### **2. User Login API**

#### **Endpoint**: `POST /api/login`

#### **Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### **Test Cases**:

**✅ Valid Login**:
```json
{
  "email": "alice@example.com",
  "password": "password123"
}
```

**✅ Invalid Email**:
```json
{
  "email": "nonexistent@example.com",
  "password": "password123"
}
```

**✅ Invalid Password**:
```json
{
  "email": "alice@example.com",
  "password": "wrongpassword"
}
```

#### **Expected Response (200 OK)**:
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid-string",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "role": "STUDENT",
    "referralCode": "generated-uuid"
  }
}
```

#### **Error Response (401 Unauthorized)**:
```json
{
  "error": "Invalid email or password"
}
```

### **3. NextAuth.js Authentication**

#### **Endpoint**: `POST /api/auth/signin`

#### **Request Body**:
```json
{
  "email": "alice@example.com",
  "password": "password123"
}
```

#### **Headers**:
```
Content-Type: application/x-www-form-urlencoded
```

#### **Expected Response**: Redirect to dashboard or session data

## 🧪 **Postman Collection Setup**

### **1. Create New Collection**
1. Open Postman
2. Click "New" → "Collection"
3. Name it "LMS API Testing"

### **2. Environment Variables**
Create an environment with these variables:
```
base_url: http://localhost:3000
user_email: alice@example.com
user_password: password123
auth_token: (will be set after login)
```

### **3. Collection Structure**
```
LMS API Testing/
├── Authentication/
│   ├── Register User
│   ├── Login User
│   └── NextAuth Signin
├── User Management/
│   ├── Get User Profile
│   └── Update User
└── Testing/
    ├── Health Check
    └── Error Testing
```

## 📋 **Step-by-Step Testing Process**

### **Step 1: Test Registration**

1. **Create Request**:
   - Method: `POST`
   - URL: `{{base_url}}/api/register`
   - Headers: `Content-Type: application/json`

2. **Request Body**:
   ```json
   {
     "name": "Test User",
     "email": "test@example.com",
     "password": "password123",
     "role": "STUDENT"
   }
   ```

3. **Send Request** and verify:
   - Status: `201 Created`
   - Response contains user data
   - `referralCode` is generated

### **Step 2: Test Login**

1. **Create Request**:
   - Method: `POST`
   - URL: `{{base_url}}/api/login`
   - Headers: `Content-Type: application/json`

2. **Request Body**:
   ```json
   {
     "email": "test@example.com",
     "password": "password123"
   }
   ```

3. **Send Request** and verify:
   - Status: `200 OK`
   - Response contains user data
   - No password in response

### **Step 3: Test Error Cases**

#### **Registration Errors**:
1. **Invalid Email**:
   ```json
   {
     "name": "Test User",
     "email": "invalid-email",
     "password": "password123",
     "role": "STUDENT"
   }
   ```

2. **Short Password**:
   ```json
   {
     "name": "Test User",
     "email": "test@example.com",
     "password": "123",
     "role": "STUDENT"
   }
   ```

3. **Duplicate Email**:
   - Use the same email from Step 1

#### **Login Errors**:
1. **Invalid Email**:
   ```json
   {
     "email": "nonexistent@example.com",
     "password": "password123"
   }
   ```

2. **Invalid Password**:
   ```json
   {
     "email": "test@example.com",
     "password": "wrongpassword"
   }
   ```

## 🔄 **Automated Testing Scripts**

### **1. Pre-request Script (for Registration)**:
```javascript
// Generate unique email
const timestamp = Date.now();
pm.environment.set("test_email", `test${timestamp}@example.com`);
```

### **2. Test Script (for Registration)**:
```javascript
// Test registration response
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Response has user data", function () {
    const response = pm.response.json();
    pm.expect(response).to.have.property('user');
    pm.expect(response.user).to.have.property('id');
    pm.expect(response.user).to.have.property('referralCode');
});

// Store user data for later tests
if (pm.response.code === 201) {
    const response = pm.response.json();
    pm.environment.set("user_id", response.user.id);
    pm.environment.set("user_email", response.user.email);
}
```

### **3. Test Script (for Login)**:
```javascript
// Test login response
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has user data", function () {
    const response = pm.response.json();
    pm.expect(response).to.have.property('user');
    pm.expect(response.user).to.have.property('email');
    pm.expect(response.user).to.not.have.property('password');
});
```

## 🎯 **Testing Checklist**

### **Registration Testing**:
- [ ] Valid student registration
- [ ] Valid teacher registration
- [ ] Valid admin registration
- [ ] Registration with referral code
- [ ] Invalid email format
- [ ] Short password
- [ ] Missing required fields
- [ ] Duplicate email

### **Login Testing**:
- [ ] Valid login
- [ ] Invalid email
- [ ] Invalid password
- [ ] Missing credentials
- [ ] Non-existent user

### **Error Handling**:
- [ ] Validation errors
- [ ] Server errors
- [ ] Network errors
- [ ] Timeout errors

## 🚨 **Common Issues & Solutions**

### **1. CORS Issues**
If you get CORS errors, ensure your Next.js app is running:
```bash
npm run dev
```

### **2. Database Connection**
Make sure your database is running and accessible:
```bash
# Check database connection
npx prisma studio
```

### **3. Environment Variables**
Ensure `.env.local` is set up:
```env
DATABASE_URL="your-database-url"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### **4. Port Issues**
If port 3000 is busy, change it:
```bash
npm run dev -- -p 3001
```

## 📊 **Expected Test Results**

### **Success Rates**:
- Registration: 100% for valid data
- Login: 100% for correct credentials
- Error handling: 100% for invalid data

### **Response Times**:
- Registration: < 2 seconds
- Login: < 1 second
- Error responses: < 500ms

---

**Note**: Make sure your Next.js development server is running (`npm run dev`) before testing the APIs in Postman. 