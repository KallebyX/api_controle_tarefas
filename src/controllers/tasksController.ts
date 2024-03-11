import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const createTask = async (req: Request, res: Response): Promise<void> => {
    const { title, content, categoryId } = req.body;

    try {
        if (categoryId) {
            const category = await prisma.category.findUnique({
                where: { id: categoryId },
            });

            if (!category) {
                res.status(404).json({ message: "Category not found" });
                return;
            }
        }

        const task = await prisma.task.create({
            data: {
                title,
                content,
                categoryId,
            },
        });

        res.status(201).json(task);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(409).json({ message: "Invalid request body" });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};
