// Import the mongoose package
import mongoose from "mongoose";

// Define the schema for the OverallStat model
const OverallStatSchema = new mongoose.Schema(
  {
    // Total number of customers
    totalCustomers: Number,

    // Total sales amount for the entire year
    yearlySalesTotal: Number,

    // Total units sold for the entire year
    yearlyTotalSoldUnits: Number,

    // The year for which the stats are being tracked
    year: Number,

    // Monthly sales data for the year
    monthlyData: [
      {
        // Month name
        month: String,

        // Total sales for the month
        totalSales: Number,

        // Total units sold for the month
        totalUnits: Number,
      },
    ],

    // Daily sales data for the year
    dailyData: [
      {
        // Date in YYYY-MM-DD format
        date: String,

        // Total sales for the day
        totalSales: Number,

        // Total units sold for the day
        totalUnits: Number,
      },
    ],

    // Sales data by category for the year
    salesByCategory: {
      type: Map,
      of: Number,
    },
  },

  // Add timestamps to the schema
  { timestamps: true }
);

// Create the OverallStat model using the schema
const OverallStat = mongoose.model("OverallStat", OverallStatSchema);

// Export the model for use in other files
export default OverallStat;
