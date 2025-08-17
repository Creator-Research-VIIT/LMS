# 🎓 Teacher Approval System

## 📋 **Overview**

The teacher approval system allows administrators to review and approve teacher registrations before they can access the platform.

## 🔧 **Features Implemented**

### **1. Database Schema Updates**
- Added `isApproved` field to User model
- Default value: `false` for all users
- Auto-approval for STUDENT and ADMIN roles

### **2. API Endpoints**

#### **GET /api/teachers/pending**
- **Purpose**: Get all pending teacher approvals
- **Access**: Admin only
- **Response**: List of teachers with `isApproved: false`

#### **PATCH /api/teachers/:id/approve**
- **Purpose**: Approve a specific teacher
- **Access**: Admin only
- **Parameters**: Teacher ID in URL
- **Response**: Updated teacher data

### **3. Route Protection**
- **Middleware**: Protects `/api/teachers/*` routes
- **Role Check**: Only ADMIN users can access
- **Authentication**: Required for all teacher management routes

### **4. Admin Dashboard**
- **URL**: `/admin`
- **Component**: `PendingTeachers.tsx`
- **Features**: View and approve pending teachers

## 🚀 **Usage**

### **Registration Flow**
1. **Student/Admin Registration**: Auto-approved
2. **Teacher Registration**: Requires admin approval
3. **Pending Teachers**: Listed in admin dashboard

### **Admin Workflow**
1. **Access Admin Dashboard**: Navigate to `/admin`
2. **View Pending Teachers**: See all unapproved teachers
3. **Review Teacher Details**: Name, email, application date
4. **Approve Teachers**: Click "Approve" button
5. **Real-time Updates**: Approved teachers removed from list

## 📡 **API Documentation**

### **Get Pending Teachers**

**Endpoint**: `GET /api/teachers/pending`

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "message": "Pending teachers retrieved successfully",
  "teachers": [
    {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "TEACHER",
      "isApproved": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "referralCode": "uuid"
    }
  ],
  "count": 1
}
```

**Error Responses**:
- `401 Unauthorized`: Not authenticated
- `403 Forbidden`: Not admin user

### **Approve Teacher**

**Endpoint**: `PATCH /api/teachers/:id/approve`

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "message": "Teacher approved successfully",
  "teacher": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "TEACHER",
    "isApproved": true,
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses**:
- `401 Unauthorized`: Not authenticated
- `403 Forbidden`: Not admin user
- `404 Not Found`: Teacher not found
- `400 Bad Request`: Teacher already approved or not a teacher

## 🛡️ **Security Features**

### **Role-Based Access Control**
- **Admin Routes**: Protected by middleware
- **API Endpoints**: Server-side role validation
- **Frontend Components**: Client-side role checks

### **Authentication**
- **Session Validation**: All requests require valid session
- **Token Verification**: JWT tokens validated
- **Role Verification**: User role checked on each request

## 🧪 **Testing**

### **Test Teacher Registration**
```bash
curl -X POST http://localhost:3001/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Teacher",
    "email": "teacher@example.com",
    "password": "password123",
    "role": "TEACHER"
  }'
```

### **Test Admin Login**
```bash
curl -X POST http://localhost:3001/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'
```

### **Test Get Pending Teachers**
```bash
curl -X GET http://localhost:3001/api/teachers/pending \
  -H "Authorization: Bearer <admin-token>"
```

### **Test Approve Teacher**
```bash
curl -X PATCH http://localhost:3001/api/teachers/<teacher-id>/approve \
  -H "Authorization: Bearer <admin-token>"
```

## 🎯 **Next Steps**

### **Planned Features**
- [ ] Email notifications for teacher approvals
- [ ] Teacher rejection functionality
- [ ] Approval history tracking
- [ ] Bulk approval operations
- [ ] Teacher profile management

### **Integration Points**
- Course creation (only approved teachers)
- Teacher dashboard access
- Content management permissions
- Analytics and reporting

---

**Note**: Make sure to test the approval system with different user roles to ensure proper access control. 