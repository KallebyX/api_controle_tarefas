import { Request, Response, NextFunction } from 'express';
import { createTaskService, getTasksService, getTaskByIdService, updateTaskService, deleteTaskService } from '../services/tasksService';

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, content, categoryId } = req.body;
        const task = await createTaskService(title, content, categoryId);
        res.status(201).json(task);
    } catch (err) {
        next(err);
    }
};

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { category } = req.query;
        const tasks = await getTasksService(category as string);
        res.json(tasks);
    } catch (err) {
        next(err);
    } 
};

export const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const task = await getTaskByIdService(parseInt(req.params.id));
        res.json(task);
    } catch (err) {
        next(err);
    }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, content, finished, categoryId } = req.body;
        const task = await updateTaskService(parseInt(req.params.id), title, content, finished, categoryId);
        res.json(task);
    } catch (err) {
        next(err);
    }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteTaskService(parseInt(req.params.id));
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};
