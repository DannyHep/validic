import express from "express";
import userController from "../controllers/user.js";

const router = express.Router();

router.get("/myHealth", userController);

export default router;
