import express from "express";
import verifyJwt from "../middleware/verifyJwt";
import { addTask, deleteTask, fetchAllTasks } from "../controllers/handleTasks";

const handleTaskRouter = express.Router();

handleTaskRouter.get("/", verifyJwt, fetchAllTasks);
handleTaskRouter.post("/", verifyJwt, addTask);
handleTaskRouter.delete("/:id", verifyJwt, deleteTask);

// handleTaskRouter.delete("/:id", verifyJwt, () => {
//   console.log("Hello world! DELETE");
// });

export default handleTaskRouter;
