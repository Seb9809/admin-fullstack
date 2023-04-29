import User from "../models/User.js";
import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";

// A function to get a single user by their ID
export const getUser = async (req, res) => {
  try {
    // Get the user ID from the request parameters
    const { id } = req.params;

    // Use the Mongoose findById method to find the user with the specified ID
    const user = await User.findById(id);

    // Return the user as a JSON response with a 200 status code
    res.status(200).json(user);
  } catch (error) {
    // If there was an error, return a JSON response with a 404 status code and an error message
    res.status(404).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // hardcoded values for current month, year, and date
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    /* Recent transactions */
    // find 50 latest transactions sorted by the 'createdOn' field in descending order
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    /* Overall stats */
    // find overall stats for the current year
    const overallStat = await OverallStat.find({ year: currentYear });

    // extract various data points from the overall stats
    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    // extract monthly stats for the current month from the overall stats
    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    // extract daily stats for the current day from the overall stats
    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    // return all the extracted data as a JSON response
    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    // handle any errors that may occur during execution
    res.status(404).json({ message: error.message });
  }
};
