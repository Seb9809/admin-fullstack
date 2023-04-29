import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

/**
 * Retrieves a list of all users with the "admin" role, excluding their password.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - The list of admin users.
 */
export const getAdmins = async (req, res) => {
  try {
    // Find all users with the "admin" role and exclude their password from the results.
    const admins = await User.find({ role: "admin" }).select("-password");

    // Return the list of admin users in the response.
    res.status(200).json(admins);
  } catch (error) {
    // If there is an error, return a 404 status code and an error message in the response.
    res.status(404).json({ message: error.message });
  }
};

export const getUserPerformance = async (req, res) => {
  try {
    // Retrieve user ID from request parameters
    const { id } = req.params;

    // Aggregate query to get the user with affiliate statistics
    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" },
    ]);

    // Get sale transactions from affiliate statistics
    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );

    // Filter out any null transactions
    const filteredSaleTransactions = saleTransactions.filter(
      (transaction) => transaction !== null
    );

    // Send response with user and sale transaction data
    res
      .status(200)
      .json({ user: userWithStats[0], sales: filteredSaleTransactions });
  } catch (error) {
    // Handle any errors
    res.status(404).json({ message: error.message });
  }
};
