import express from "express";
//Import the Express library and the controller functions for this router
import { getSales } from "../controllers/sales.js";

//Create an instance of the Express router
const router = express.Router();

//Define the endpoints with their respective controller functions
router.get("/sales", getSales);

export default router;
