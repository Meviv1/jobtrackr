import express from"express"
import{createJob,getJobs ,deleteJob,getJobById,updateJob} from "../controllers/jobController.js"
import authMiddleware from "../middleware/authMiddleware.js"
import { get } from "mongoose";

const router = express.Router();

router.get("/",authMiddleware,getJobs);
router.post("/",authMiddleware,createJob)
router.delete("/:id",authMiddleware,deleteJob);


router.get("/:id", authMiddleware, getJobById);
router.put("/:id", authMiddleware, updateJob);


export default router;