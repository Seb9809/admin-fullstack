import mongoose from "mongoose";

// Creating a new schema for ProductStat
const ProductStatSchema = new mongoose.Schema(
  {
    // ID of the product this stat belongs to
    productId: String,
    // Total sales of the product for a given year
    yearlySalesTotal: Number,
    // Total units sold of the product for a given year
    yearlyTotalSoldUnits: Number,
    // Year to which this stat belongs
    year: Number,
    // Monthly data for the product
    monthlyData: [
      {
        // Month name for the data
        month: String,
        // Total sales for the month
        totalSales: Number,
        // Total units sold for the month
        totalUnits: Number,
      },
    ],
    // Daily data for the product
    dailyData: [
      {
        // Date for the data
        date: String,
        // Total sales for the date
        totalSales: Number,
        // Total units sold for the date
        totalUnits: Number,
      },
    ],
  },
  // Setting timestamps for created and updated fields
  { timestamps: true }
);

// Creating a Mongoose model for the ProductStat schema
const ProductStat = mongoose.model("ProductStat", ProductStatSchema);

// Exporting the ProductStat model
export default ProductStat;
