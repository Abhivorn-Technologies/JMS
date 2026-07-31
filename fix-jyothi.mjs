import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
}, { strict: false });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

async function fixCategory() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to DB');
  
  const result = await Product.updateMany(
    { name: 'jyothi', category: { $exists: false } },
    { $set: { category: 'Surgical' } }
  );
  
  console.log(`Updated ${result.modifiedCount} products`);
  process.exit(0);
}

fixCategory();
