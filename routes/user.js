import express from "express";
import {
  createNewUser,
  getValidicProfile,
  createTrackerMeasurements,
  parsedTrackerData,
} from "../controllers/user.js";

const router = express.Router();

// router.get("/my-health", getAllUsers);
// router.post("/validic-fitness-data", getValidicFitnessData);
router.post("/create-validic-profile", createNewUser);
router.post("/validic-profile", getValidicProfile);
router.post("/createHealthTrackerValues", createTrackerMeasurements);

router.post("/getTrackerMeasurements", parsedTrackerData);

export { router };
