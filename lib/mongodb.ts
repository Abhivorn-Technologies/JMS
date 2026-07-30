import mongoose from 'mongoose';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 2000, // Short timeout for faster fallback
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then(async (mongoose) => {
      // Seed default admin if no users exist
      try {
        const userCount = await mongoose.connection.collection('users').countDocuments();
        if (userCount === 0) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash('Admin@123', salt);
          
          await mongoose.connection.collection('users').insertOne({
            name: 'System Admin',
            email: 'admin@jmshospital.com',
            password: hashedPassword,
            role: 'Admin',
            createdAt: new Date(),
            updatedAt: new Date()
          });
          console.log('Default admin seeded successfully');
        }
      } catch (e) {
        console.error('Failed to seed admin', e);
      }

      return mongoose;
    }).catch(err => {
      cached.promise = null; // Clear promise so we can retry later
      throw err;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  
  return cached.conn;
}

export default dbConnect;
