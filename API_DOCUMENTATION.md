# Registration API Documentation

## Endpoint: `/api/register`

### Method: POST

### Description
Handles user registration with validation, password hashing, and referral code functionality.

### Request Body
```json
{
  "name": "string (min 2 characters)",
  "email": "string (valid email format)",
  "password": "string (min 6 characters)",
  "role": "STUDENT | TEACHER | ADMIN",
  "referralCode": "string (optional)"
}
```

### Response

#### Success (201 Created)
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "name": "string",
    "email": "string",
    "role": "STUDENT | TEACHER | ADMIN",
    "referralCode": "uuid",
    "createdAt": "datetime"
  }
}
```

#### Error Responses

**400 Bad Request - Validation Error**
```json
{
  "error": "Validation failed",
  "details": [
    {
      "code": "string",
      "message": "string",
      "path": ["field_name"]
    }
  ]
}
```

**400 Bad Request - Email Already Exists**
```json
{
  "error": "User with this email already exists"
}
```

**500 Internal Server Error**
```json
{
  "error": "Internal server error"
}
```

### Features

1. **Input Validation**: Uses Zod schema validation for all input fields
2. **Password Hashing**: Passwords are hashed using bcrypt with salt rounds of 12
3. **Email Uniqueness**: Checks if user with same email already exists
4. **Referral System**: 
   - If valid referral code provided, stores the referrer's ID
   - Each new user gets a unique referral code (UUID)
   - Invalid referral codes are ignored (registration continues)
5. **Role-based Registration**: Supports STUDENT, TEACHER, and ADMIN roles

### Database Schema Updates

The User model has been updated with:
- `referralCode`: Unique UUID for each user
- `referredBy`: Optional field storing the ID of the user who referred this user
- Self-referencing relations for tracking referral relationships

### Security Features

- Password hashing with bcrypt
- Input validation and sanitization
- Unique email constraint
- UUID-based IDs and referral codes 