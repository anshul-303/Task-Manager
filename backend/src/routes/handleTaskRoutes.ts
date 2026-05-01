import express from "express";
import verifyJwt from "../middleware/verifyJwt";
import {
  addTask,
  deleteTask,
  fetchAllTasks,
  updateCompletedStatus,
} from "../controllers/handleTasks";

const handleTaskRouter = express.Router();

handleTaskRouter.get("/", verifyJwt, fetchAllTasks);
handleTaskRouter.post("/", verifyJwt, addTask);
handleTaskRouter.delete("/:id", verifyJwt, deleteTask);
handleTaskRouter.put("/:id", verifyJwt, updateCompletedStatus);

export default handleTaskRouter;
