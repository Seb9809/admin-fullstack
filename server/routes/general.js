import express from "express";
//Import the Express library and the controller functions for this router
import { getUser, getDashboardStats } from "../controllers/general.js";

//Create an instance of the Express router
const router = express.Router();

//Define the endpoints with their respective controller functions
router.get("/user/:id", getUser);
router.get("/dashboard", getDashboardStats);

export default router;
