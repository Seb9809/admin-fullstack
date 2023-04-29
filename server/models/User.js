import mongoose from "mongoose";

// Defining a new mongoose schema for User collection
const UserSchema = new mongoose.Schema(
  {
    // User's name
    name: {
      // Setting the data type to string and making it required
      type: String,
      required: true,
      // Setting minimum and maximum length constraints
      min: 2,
      max: 100,
    },
    // User's email address
    email: {
      // Setting the data type to string and making it required
      type: String,
      required: true,
      // Setting maximum length and uniqueness constraint
      max: 100,
      unique: true,
    },
    // User's password
    password: {
      // Setting the data type to string and making it required
      type: String,
      required: true,
      // Setting minimum length constraint
      min: 2,
    },
    // User's city
    city: String,
    // User's state
    state: String,
    // User's country
    country: String,
    // User's occupation
    occupation: String,
    // User's phone number
    phoneNumber: String,
    // Array of user's transactions
    transactions: Array,
    // User's role
    role: {
      // Setting the data type to string and providing a list of possible values
      type: String,
      enum: ["user", "admin", "superadmin"],
      // Setting the default value to "admin"
      default: "admin",
    },
  },
  // Setting timestamps for created and updated files
  { timestamps: true }
);

// Creating a mongoose model for the UserSchema
const User = mongoose.model("User", UserSchema);

// Exporting the User model
export default User;
