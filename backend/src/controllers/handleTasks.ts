import { Request, Response } from "express";
import { HandleTaskRequest } from "../types/types";
import db from "../config/db";
import { RowDataPacket } from "mysql2";
import { v4 as uuidv4 } from "uuid";

// /tasks/:id DELETE
// tasks/ POST
// /tasks/:id PUT

export async function fetchAllTasks(req: HandleTaskRequest, res: Response) {
  try {
    if (!req.userInfo) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("Fetching all tasks...");
    const userId = req.userInfo!.id;

    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT id , title as task, completed  from todos WHERE user_id=?;`,
      [userId],
    );
    // console.log(rows);
    res.status(200).json({
      message: "The tasks and its details have been fetched!",
      rows: rows,
    });
    return;
  } catch (error) {
    console.log("Error occured : ", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

export async function addTask(req: HandleTaskRequest, res: Response) {
  try {
    if (!req.userInfo) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("Adding task...");
    const userId = req.userInfo.id;
    const { task } = req.body;

    if (!task) {
      return res.status(400).json({ message: "Task is required" });
    }

    const newid: string = uuidv4();

    await db.execute(
      `INSERT INTO todos (id, title, completed, user_id) VALUES (?, ?, false, ?);`,
      [newid, task, userId],
    );

    //Fetching new set of updated tasks
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT id , title as task, completed  from todos WHERE user_id=?;`,
      [userId],
    );

    res.status(201).json({ message: "Task created successfully!", rows: rows });
  } catch (error) {
    console.log("Error occured : ", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

export async function deleteTask(req: HandleTaskRequest, res: Response) {
  try {
    if (!req.userInfo) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("Deleting task...");
    const userId = req.userInfo.id;
    const { id } = req.params;

    await db.execute(`DELETE FROM todos WHERE user_id=? AND id=? LIMIT 1;`, [
      userId,
      id,
    ]);

    //Fetching new set of updated tasks
    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT id , title as task, completed  from todos WHERE user_id=?;`,
      [userId],
    );

    res.status(200).json({ message: "Task deleted successfully!", rows: rows });
  } catch (error) {
    console.log("Error occured : ", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}
