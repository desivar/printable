import Product from '../models/Product.js'; // Import your Product model
import mongoose from 'mongoose'; // Import mongoose for ObjectId validation

// GET all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'name'); // Populate category name
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
}

// GET a specific product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name');
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
}

// POST a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand, imageUrl, fileFormat, keywords, downloadsAllowed, licenseType, printSizes, dpi } = req.body;

    // POST a new product

    if (!name || !description || price === undefined || !category) {
      return res.status(400).json({ message: 'Name, description, price, and category are required.' });
    }

    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ message: 'Invalid category ID.' });
    }


  } catch (error) {
    console.error("Error creating product:", error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(el => el.message);
      return res.status(400).json({ message: 'Validation error', errors });
    }
    res.status(500).json({ message: "Failed to create product" });
  }
};

// PUT update a product by ID
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, brand, imageUrl, fileFormat, keywords, downloadsAllowed, licenseType, printSizes, dpi } = req.body;

    
    if (category && !mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ message: 'Invalid category ID.' });
    }

  } catch (error) {
    console.error("Error updating product:", error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(el => el.message);
      return res.status(400).json({ message: 'Validation error', errors });
    }
    res.status(500).json({ message: "Failed to update product" });
  }
};

// DELETE a product by ID
export const deleteProduct = async (req, res) => {
  try {
    // DELETE a product by ID
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(204).send(); // 204 No Content for successful deletion
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Failed to delete product" });
    }
  };
