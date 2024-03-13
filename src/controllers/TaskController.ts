import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const TaskSchema = z.object({
  title: z.string(),
  content: z.string(),
  categoryId: z.number().optional(),
});

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const parsedData = TaskSchema.parse(req.body);
      const task = await prisma.task.create({
        data: parsedData,
      });
      return res.status(201).json(task);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static getTasks = async (req: Request, res: Response) => {
    try {
      const { category } = req.query;
      const tasks = await prisma.task.findMany({
        where: {
          category: {
            name: category?.toString(),
          },
        },
        include: {
          category: true,
        },
      });
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static getTaskById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const task = await prisma.task.findUnique({
        where: { id: Number(id) },
        include: {
          category: true,
        },
      });
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      return res.status(200).json(task);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static updateTask = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const parsedData = TaskSchema.partial().parse(req.body);
      const task = await prisma.task.update({
        where: { id: Number(id) },
        data: parsedData,
      });
      return res.status(200).json(task);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static deleteTask = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await prisma.task.delete({
        where: { id: Number(id) },
      });
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
}
