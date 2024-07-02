import express from "express";
import {
  createShort,
  getShortsFeed,
  filterShorts,
} from "../controllers/shortsController.js";

const router = express.Router();

router.post("/shorts", createShort);
router.get("/shorts", getShortsFeed);
router.get("/shorts/filter", filterShorts);

export default router;
