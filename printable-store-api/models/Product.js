import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  brand: { type: String },
  imageUrl: { type: String },
  fileFormat: [{ type: String }], // Array of accepted file formats (e.g., ["PDF", "JPG"])
  keywords: [{ type: String }], // Array of keywords for search
  downloadsAllowed: { type: Number, default: 5 }, // Let's keep this for potential download limits
  licenseType: { type: String },
  printSizes: [{ type: String }], // Array of recommended print sizes
  dpi: { type: Number }, // Resolution in dots per inch
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;