const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
dotenv.config({ path: '.env.local' });

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  photo: { type: String, default: '' },
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Editor'], default: 'Admin' },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  await Product.deleteMany({}); // Clear existing

  await Product.insertMany([
    {
      name: 'Labomed Prima Surgical Microscope',
      description: 'High-precision surgical microscope designed for detailed ENT and neurosurgical procedures. Features brilliant optics and ergonomic handling.',
      price: 15400.00,
      photo: '/images/surgical_microscope.png'
    },
    {
      name: 'AMT-SPIN X PRO Endoscopy System',
      description: 'Advanced medical endoscopy system with crystal clear HD monitor and microdebrider console for precise surgical interventions.',
      price: 24500.00,
      photo: '/images/endoscopy_system.png'
    },
    {
      name: 'COAGLATOR II Electrosurgical Unit',
      description: 'Reliable and robust electrosurgical generator offering monopolar and bipolar modes for precise cutting and coagulation.',
      price: 4200.00,
      photo: '' // Leave empty to show fallback
    }
  ]);

  await User.deleteMany({});
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password123', salt);
  
  await User.create({
    name: 'Admin',
    email: 'admin@jmshospital.com',
    password: hashedPassword,
    role: 'Admin'
  });

  console.log('Database seeded successfully (Products + Admin User)!');
  process.exit();
}

seed();
