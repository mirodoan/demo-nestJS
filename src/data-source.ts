import 'dotenv/config';
import { DataSource } from 'typeorm';

// Parse DATABASE_URL to get SSL configuration
const databaseUrl = process.env.DATABASE_URL || '';
const isSSLRequired =
  databaseUrl.includes('sslmode=require') ||
  process.env.NODE_ENV === 'production';

console.log('🔧 Database configuration:');
console.log('- URL:', databaseUrl.replace(/:[^@]+@/, ':****@')); // Hide password
console.log('- SSL Required:', isSSLRequired);
console.log('- Node Environment:', process.env.NODE_ENV);

// Parse URL manually for explicit config
let connectionConfig: any = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [process.cwd() + '/dist/**/*.entity.js'],
  migrations: [process.cwd() + '/dist/migrations/*.js'],
  synchronize: false,
};

// If SSL is required, add SSL configuration
if (isSSLRequired) {
  connectionConfig.ssl = {
    rejectUnauthorized: false, // For AWS RDS with self-signed certificates
  };

  // Also try to parse URL and use explicit config
  try {
    const url = new URL(databaseUrl.replace('postgres://', 'postgresql://'));
    connectionConfig = {
      ...connectionConfig,
      host: url.hostname,
      port: parseInt(url.port) || 5432,
      username: url.username,
      password: url.password,
      database: url.pathname.slice(1), // Remove leading slash
      ssl: {
        rejectUnauthorized: false,
      },
    };
    delete connectionConfig.url; // Remove URL when using explicit config
    console.log('✅ Using explicit database configuration with SSL');
  } catch (error) {
    console.log('⚠️  Fallback to URL configuration with SSL');
  }
}

export const AppDataSource = new DataSource(connectionConfig);
