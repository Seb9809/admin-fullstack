import express from "express";
//Import the Express library and the controller functions for this router
import { getAdmins, getUserPerformance } from "../controllers/management.js";

//Create an instance of the Express router
const router = express.Router();

//Define the endpoints with their respective controller functions
router.get("/admins", getAdmins);
router.get("/performance/:id", getUserPerformance);

export default router;
