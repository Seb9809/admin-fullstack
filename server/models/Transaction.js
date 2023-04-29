import mongoose from "mongoose";

// Creating a new schema for a transaction with properties userId, cost, and an array of products
const TransactionSchema = new mongoose.Schema(
  {
    // The ID of the user associated with the transaction
    userId: String,
    // Cost of the Transaction
    cost: String,
    // An array of product IDs included in the transaction
    products: {
      //Type is an array of Object IDs
      type: [mongoose.Types.ObjectId],
      //Each product ID is a Number
      of: Number,
    },
  },
  //Setting timestamps for created and updated files
  { timestamps: true }
);

//Creating a mongoose model for the TransactionSchema
const Transaction = mongoose.model("Transaction", TransactionSchema);

//Exporting the Transaction model
export default Transaction;
