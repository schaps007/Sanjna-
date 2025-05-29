import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface AuthRequest extends Request {
  user?: any;
}

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.userId;
    const tasks = await prisma.task.findMany({ where: { userId } });
    res.json(tasks);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: "Title required" });

  try {
    const userId = req.user.userId;
    const task = await prisma.task.create({
      data: { title, description, userId },
    });
    res.status(201).json(task);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  const taskId = Number(req.params.id);
  const { title, description, isComplete } = req.body;
  const userId = req.user.userId;

  try {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task || task.userId !== userId) return res.status(404).json({ message: "Task not found" });

    const updated = await prisma.task.update({
      where: { id: taskId },
      data: { title, description, isComplete },
    });
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  const taskId = Number(req.params.id);
  const userId = req.user.userId;

  try {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task || task.userId !== userId) return res.status(404).json({ message: "Task not found" });

    await prisma.task.delete({ where: { id: taskId } });
    res.json({ message: "Task deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
