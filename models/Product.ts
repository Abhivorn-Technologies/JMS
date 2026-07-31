import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 150,
    },
    description: {
      type: String,
      required: true,
      maxlength: 5000,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    photo: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
      default: 'Equipment'
    },
    badge: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

if (mongoose.models.Product) {
  delete mongoose.models.Product;
}
export default mongoose.model('Product', ProductSchema);
