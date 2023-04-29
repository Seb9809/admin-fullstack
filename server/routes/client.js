import express from "express";
//Import the Express library and the controller functions for this router
import {
  getProducts,
  getCustomers,
  getTransaction,
  getGeography,
} from "../controllers/client.js";

//Create an instance of the Express router
const router = express.Router();

//Define the endpoints with their respective controller functions
router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransaction);
router.get("/geography", getGeography);

export default router;
