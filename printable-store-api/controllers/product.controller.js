import Product from '../models/Product.js'; // Import your Product model
import mongoose from 'mongoose'; // Import mongoose for ObjectId validation

// GET all products
export const getAllProducts = async (req, res) => {
  try {
    // Implement logic to fetch all products from the database
    // and send them in the response.
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// GET a specific product by ID
export const getProductById = async (req, res) => {
  try {
    // Implement logic to fetch a product by ID from the database
    // and send it in the response.
    // If the product is not found, send a 404 response.
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

// POST a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand, imageUrl, fileFormat, keywords, downloadsAllowed, licenseType, printSizes, dpi } = req.body;

    // Validation (ensure required fields are present and category is a valid ObjectId)
    if (!name || !description || price === undefined || !category) {
      return res.status(400).json({ message: 'Name, description, price, and category are required.' });
    }

    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ message: 'Invalid category ID.' });
    }

    // Create a new Product instance and save it to the database
    // Send the saved product in the response.
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

    // Validation (ensure category is a valid ObjectId if provided)
    if (category && !mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ message: 'Invalid category ID.' });
    }

    // Implement logic to update the product in the database by ID
    // Send the updated product in the response.
    // If the product is not found, send a 404 response.
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
    // Implement logic to delete the product from the database by ID.
    // Send a 204 No Content response if successful.
    // If the product is not found, send a 404 response.
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};