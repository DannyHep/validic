import express from "express";
import {
  createNewUser,
  getValidicProfile,
  getValidicFitnessData,
} from "../controllers/user.js";

const router = express.Router();

// router.get("/my-health", getAllUsers);
router.post("/validic-fitness-data", getValidicFitnessData);
router.post("/create-validic-profile", createNewUser);
router.post("/validic-profile", getValidicProfile);

export { router };
