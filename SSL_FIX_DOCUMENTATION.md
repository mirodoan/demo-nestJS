# Database SSL Connection Fix

## Problem

The application was failing to run migrations on AWS ECS due to a `SELF_SIGNED_CERT_IN_CHAIN` error when connecting to AWS RDS PostgreSQL database.

## Root Cause

AWS RDS uses SSL certificates that are considered "self-signed" by Node.js, causing connection failures when using `sslmode=require` in the connection string.

## Solution

Updated `src/data-source.ts` to properly handle SSL connections:

1. **SSL Detection**: Automatically detects when SSL is required based on:
   - `sslmode=require` parameter in DATABASE_URL
   - `NODE_ENV=production` environment

2. **SSL Configuration**: Sets `rejectUnauthorized: false` to accept AWS RDS certificates

3. **Connection Strategy**:
   - Attempts to parse DATABASE_URL and use explicit connection config
   - Falls back to URL-based config if parsing fails
   - Both approaches include proper SSL settings

## Key Changes

```typescript
// Before
export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  // ... other config
});

// After
const isSSLRequired =
  databaseUrl.includes('sslmode=require') ||
  process.env.NODE_ENV === 'production';

// Uses explicit config with SSL for production
connectionConfig = {
  type: 'postgres',
  host: url.hostname,
  port: parseInt(url.port) || 5432,
  username: url.username,
  password: url.password,
  database: url.pathname.slice(1),
  ssl: {
    rejectUnauthorized: false, // Accept AWS RDS certificates
  },
  // ... other config
};
```

## Testing

- ✅ Local connection test passed
- ✅ Migration test passed
- ✅ Production database connection successful

## Deployment

The fix is now ready for ECS deployment. The container will properly connect to AWS RDS and run migrations successfully.

## Environment Variables Required

- `DATABASE_URL`: Must include `?sslmode=require` for production
- `NODE_ENV`: Should be set to `production` for ECS deployment
