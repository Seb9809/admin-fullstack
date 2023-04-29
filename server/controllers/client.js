import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";

// This function retrieves all products from the database along with their associated statistics
export const getProducts = async (req, res) => {
  try {
    // Find all products in the database
    const products = await Product.find();

    // Use Promise.all to execute an async operation on each product in parallel
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        // Retrieve the statistics for this product
        const stat = await ProductStat.find({
          productId: product._id,
        });

        // Combine the product and its statistics into a single object
        return {
          ...product._doc,
          stat,
        };
      })
    );

    // Send the response with the list of products and their statistics
    res.status(200).json(productsWithStats);
  } catch (error) {
    // If an error occurs, send a response with an error message
    res.status(404).json({ message: error.message });
  }
};

// Define an asynchronous function to get all customers with role "user"
export const getCustomers = async (req, res) => {
  try {
    // Use Mongoose to find all users with role "user" and exclude their password field from the response
    const customers = await User.find({ role: "user" }).select("-password");
    // Send the customers as a JSON response with a 200 OK status code
    res.status(200).json(customers);
  } catch (error) {
    // If there is an error, send a JSON response with the error message and a 404 Not Found status code
    res.status(404).json({ message: error.message });
  }
};

// A function to handle GET requests for transactions
export const getTransaction = async (req, res) => {
  try {
    // Extract query parameters from the request
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // A function to generate the sorting criteria for the query
    const generateSort = () => {
      try {
        // Parse the "sort" query parameter to a JSON object.
        const sortParsed = JSON.parse(sort);
        const sortFormatted = {
          // Format the sort object based on the parsed parameter.
          [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1, // Format the sort object based on the parsed parameter.
        };

        return sortFormatted;
      } catch (error) {
        // Log an error message if there's an error parsing the parameter.
        console.error(`Error parsing sort parameter: ${error}`);
        // Return an empty object if there's an error.
        return {};
      }
    };

    // Generate the sorting criteria if the sort parameter is present in the query, otherwise use an empty object
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    // Find transactions matching the search criteria, sort them using the generated criteria, and limit the results to the specified page and page size
    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    // Count the total number of transactions matching the search criteria
    const total = await Transaction.countDocuments({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    });

    // Respond with a JSON object containing the transactions and the total count
    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    // Respond with a 404 error and an error message if an error occurs
    res.status(404).json({ message: error.message });
  }
};

// This function retrieves a list of all users and maps their countries to ISO3 codes,
// then generates a count for each unique country and formats the result as an array of objects
export const getGeography = async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find();

    // Map the users' countries to ISO3 codes and count the number of occurrences for each unique country
    const mappedLocations = users.reduce((acc, { country }) => {
      // Get the ISO3 code for the country
      const countryISO3 = getCountryIso3(country);

      // If the country has not been counted before, initialize the count to 0
      if (!acc[country[countryISO3]]) {
        acc[countryISO3] = 0;
      }

      // Increment the count for the country
      acc[countryISO3]++;

      // Return the accumulator
      return acc;
    }, {});

    // Format the mappedLocations object as an array of objects with "id" and "value" properties
    const formattedLocation = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    // Return the formattedLocation array as a JSON response with a 200 status code
    res.status(200).json(formattedLocation);
  } catch (error) {
    // If an error occurs, return a JSON response with a 404 status code and the error message
    res.status(404).json({ message: error.message });
  }
};
