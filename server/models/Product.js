import mongoose from "mongoose";

// Define the structure of the product document in the database
const ProductSchema = new mongoose.Schema(
  {
    // The name of the product
    name: String,

    // The price of the product in USD
    price: Number,

    // A description of the product
    description: String,

    // The category of the product
    category: String,

    // The rating of the product
    rating: Number,

    // The number of units of the product in stock
    supply: Number,
  },

  // Add timestamps to the document to track creation and update times
  { timestamps: true }
);

// Create a Mongoose model for the product collection in the database
const Product = mongoose.model("Product ", ProductSchema);

// Export the Product model for use in other parts of the application
export default Product;
