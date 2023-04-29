import OverallStat from "../models/OverallStat.js";

export const getSales = async (req, res) => {
  try {
    // Query the database for OverallStat documents.
    const overallStats = await OverallStat.find();

    // Respond with the first document found.
    res.status(200).json(overallStats[0]);
  } catch (error) {
    // If an error occurs, respond with a 404 error and the error message.
    res.status(404).json({ message: error.message });
  }
};
