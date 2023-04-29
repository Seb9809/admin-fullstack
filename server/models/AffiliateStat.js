import mongoose from "mongoose"; // Importing the mongoose library for creating MongoDB schemas and models

// Defining the schema for affiliate stats
const AffiliateStatSchema = new mongoose.Schema(
  {
    // The user ID associated with the affiliate stats
    userId: {
      type: mongoose.Types.ObjectId, // MongoDB ObjectId type
      ref: "User", // Reference to the User model
    },
    // An array of transaction IDs representing sales made by affiliates
    affiliateSales: {
      type: [mongoose.Types.ObjectId], // Array of MongoDB ObjectId type
      ref: "Transaction", // Reference to the Transaction model
    },
  },
  { timestamps: true } // Adds created and updated timestamps to the schema
);
// Creating a mongoose model for the AffiliateStat schema
const AffiliateStat = mongoose.model("AffiliateStat", AffiliateStatSchema);
// Exporting the AffiliateStat model for use in other parts of the application
export default AffiliateStat;
