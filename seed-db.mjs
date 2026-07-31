import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    photo: String,
    category: String,
    badge: String,
  },
  { timestamps: true }
);

const allMockProducts = [
  {
    name: 'Labomed Prima Surgical Microscope',
    category: 'Surgical',
    description: 'High-precision surgical microscope designed for detailed ENT and neurosurgical procedures. Features brilliant optics and ergonomic handling.',
    price: 15400.00,
    photo: '/images/surgical_microscope.png',
    badge: 'Bestseller'
  },
  {
    name: 'AMT-SPIN X PRO Endoscopy System',
    category: 'Endoscopy',
    description: 'Advanced medical endoscopy system with crystal clear HD monitor and microdebrider console for precise surgical interventions.',
    price: 24500.00,
    photo: '/images/WhatsApp Image 2026-07-29 at 10.46.34 AM (2).jpeg',
    badge: 'New Arrival'
  },
  {
    name: 'COAGLATOR II Electrosurgical Unit',
    category: 'Surgical',
    description: 'Reliable and robust electrosurgical generator offering monopolar and bipolar modes for precise cutting and coagulation.',
    price: 4200.00,
    photo: '/images/WhatsApp Image 2026-07-29 at 10.46.34 AM.jpeg'
  },
  {
    name: 'VisionX 4K Surgical Monitor',
    category: 'Imaging',
    description: 'Ultra HD 4K medical grade monitor providing unparalleled color accuracy and depth perception for critical surgical environments.',
    price: 3200.00,
    photo: '/images/WhatsApp Image 2026-07-29 at 10.46.35 AM (1).jpeg'
  },
  {
    name: 'NeuroDrill Pro System',
    category: 'Surgical',
    description: 'High-speed pneumatic drill system designed for complex cranial and spinal procedures with minimal vibration.',
    price: 8900.00,
    photo: '/images/WhatsApp Image 2026-07-29 at 10.46.35 AM (2).jpeg'
  },
  {
    name: 'Lumina LED Surgical Light',
    category: 'Equipment',
    description: 'Shadowless operating room light with adjustable color temperature and superior tissue illumination.',
    price: 6500.00,
    photo: '/images/WhatsApp Image 2026-07-29 at 10.46.35 AM (3).jpeg',
    badge: 'Top Rated'
  },
  {
    name: 'GastroView Pro Endoscope',
    category: 'Endoscopy',
    description: 'High-definition flexible video gastroscope with enhanced imaging capabilities and an ultra-slim insertion tube.',
    price: 12800.00,
    photo: '/images/WhatsApp Image 2026-07-29 at 10.46.35 AM.jpeg'
  },
  {
    name: 'ClearScan Portable Ultrasound',
    category: 'Imaging',
    description: 'Compact, point-of-care ultrasound system offering exceptional image quality for rapid diagnostics anywhere in the facility.',
    price: 18500.00,
    photo: '/images/WhatsApp Image 2026-07-29 at 10.46.36 AM (1).jpeg'
  },
  {
    name: 'AeroVent ICU Ventilator',
    category: 'Equipment',
    description: 'Advanced intensive care ventilator with multiple breathing modes and real-time monitoring displays.',
    price: 21000.00,
    photo: '/images/WhatsApp Image 2026-07-29 at 10.46.36 AM (2).jpeg'
  },
  {
    name: 'BronchoFlex Digital Scope',
    category: 'Endoscopy',
    description: 'Single-use digital flexible bronchoscope eliminating cross-contamination risks while providing crisp airway visualization.',
    price: 350.00,
    photo: '/images/WhatsApp Image 2026-07-29 at 10.46.36 AM (3).jpeg'
  },
  {
    name: 'X-Ray Mobile C-Arm System',
    category: 'Imaging',
    description: 'Versatile mobile fluoroscopy system designed for orthopedic, pain management, and general surgical applications.',
    price: 45000.00,
    photo: '/images/WhatsApp Image 2026-07-29 at 10.46.36 AM.jpeg',
    badge: 'Premium'
  },
  {
    name: 'VitalSigns Monitor Pro',
    category: 'Equipment',
    description: 'Multi-parameter patient monitor featuring a touch screen interface, ECG, SpO2, NIBP, and temperature tracking.',
    price: 1250.00,
    photo: '/images/WhatsApp Image 2026-07-29 at 10.46.39 AM.jpeg'
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
    await Product.deleteMany({});
    await Product.insertMany(allMockProducts);
    console.log("Seeded successfully");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
}
seed();
