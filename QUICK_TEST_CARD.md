# 🚀 Quick Test Card - LMS APIs

## **Base URL**: `http://localhost:3000`

---

## 📝 **1. Register User**

**Method**: `POST`  
**URL**: `http://localhost:3000/api/register`  
**Headers**: `Content-Type: application/json`

**Body**:
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "role": "STUDENT"
}
```

**Expected**: `201 Created`

---

## 🔐 **2. Login User**

**Method**: `POST`  
**URL**: `http://localhost:3000/api/login`  
**Headers**: `Content-Type: application/json`

**Body**:
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Expected**: `200 OK`

---

## 🧪 **3. Test Error Cases**

### **Invalid Registration**:
```json
{
  "name": "Test",
  "email": "invalid-email",
  "password": "123",
  "role": "STUDENT"
}
```
**Expected**: `400 Bad Request`

### **Invalid Login**:
```json
{
  "email": "nonexistent@example.com",
  "password": "wrongpassword"
}
```
**Expected**: `401 Unauthorized`

---

## ✅ **Success Response Examples**

### **Registration Success**:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid-string",
    "name": "Test User",
    "email": "test@example.com",
    "role": "STUDENT",
    "referralCode": "generated-uuid",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### **Login Success**:
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid-string",
    "name": "Test User",
    "email": "test@example.com",
    "role": "STUDENT",
    "referralCode": "generated-uuid"
  }
}
```

---

## 🎯 **Quick Test Steps**

1. **Start Server**: `npm run dev`
2. **Test Registration**: Use the register endpoint
3. **Test Login**: Use the login endpoint with same credentials
4. **Test Errors**: Try invalid data
5. **Verify Responses**: Check status codes and data

---

## 🔧 **Troubleshooting**

- **CORS Error**: Ensure server is running on `localhost:3000`
- **Database Error**: Check `.env.local` and database connection
- **Validation Error**: Check request body format
- **Server Error**: Check console logs for details 