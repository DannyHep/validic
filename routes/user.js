import express from "express";
import {
  createNewUser,
  getValidicProfile,
  createTrackerMeasurements,
  parsedTrackerData,
  addTrackerData,
} from "../controllers/user.js";
import authenticateUser from "../middleware/authenticateUser.js";

const router = express.Router();

// router.get("/my-health", getAllUsers);
// router.post("/validic-fitness-data", getValidicFitnessData);
router.post("/createHealthTrackerValues", createTrackerMeasurements); // this route doesn't need jwt protect

router.use(authenticateUser)
router.post("/create-validic-profile", createNewUser);
router.post("/validic-profile", getValidicProfile);
router.post("/getTrackerMeasurements", parsedTrackerData);
router.put("/addTrackerData", addTrackerData);

export { router };
