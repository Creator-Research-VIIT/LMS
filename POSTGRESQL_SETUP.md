# PostgreSQL Setup Guide

## 🗄️ Database Setup

### 1. Install PostgreSQL
- Download from: https://www.postgresql.org/download/
- Or use Docker: `docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres`

### 2. Create Database
```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create database
CREATE DATABASE lms_db;

-- Verify database exists
\l

-- Exit
\q
```

### 3. Update Environment Variables
Create `.env.local` file in the `my-app` directory:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/lms_db"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Push Database Schema
```bash
cd my-app
npx prisma db push
```

### 5. Verify Connection
```bash
npx prisma studio
```

## 🔧 Troubleshooting

### If you get "Authentication failed" error:
1. Check if PostgreSQL is running: `pg_isready -h localhost -p 5432`
2. Verify credentials in DATABASE_URL
3. Make sure database `lms_db` exists
4. Check PostgreSQL logs for connection issues

### Common PostgreSQL Commands:
```bash
# Start PostgreSQL service
sudo service postgresql start

# Connect to PostgreSQL
psql -U postgres

# List databases
\l

# Connect to specific database
\c lms_db

# List tables
\dt

# Exit
\q
```

### Alternative Connection Strings:
```env
# With different username/password
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/lms_db"

# With different port
DATABASE_URL="postgresql://postgres:password@localhost:5433/lms_db"

# With SSL
DATABASE_URL="postgresql://postgres:password@localhost:5432/lms_db?sslmode=require"
```
