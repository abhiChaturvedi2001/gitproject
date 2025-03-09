import express from "express"
import { fetchProfileDetails, fetchRepoDetails, postgitIssue, welcomeMessage } from "../controllers/userController.js";
const router = express.Router();

router.get("/profile", fetchProfileDetails);
router.get("/:repo", fetchRepoDetails)
router.post("/:repo/issues", postgitIssue)
router.get("/", welcomeMessage)

export default router