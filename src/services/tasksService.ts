import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTaskService = async (title: string, content: string, categoryId: number) => {
    const category = await prisma.category.findUnique({ where: { id: categoryId } });
    if (!category) {
        throw { status: 404, message: "Category not found" };
    }
    return prisma.task.create({
        data: {
            title,
            content,
            categoryId
        }
    });
};

export const getTasksService = async (categoryName?: string) => {
    const tasks = await prisma.task.findMany({
        include: {
            category: {
                where: {
                    name: categoryName
                }
            }
        }
    });
    if (categoryName && tasks.length === 0) {
        throw { status: 404, message: "Category not found" };
    }
    return tasks;
};

export const getTaskByIdService = async (id: number) => {
    const task = await prisma.task.findUnique({
        where: {
            id
        },
        include: {
            category: true
        }
    });
    if (!task) {
        throw { status: 404, message: "Task not found" };
    }
    return task;
};

export const updateTaskService = async (id: number, title: string, content: string, finished: boolean, categoryId: number) => {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) {
        throw { status: 404, message: "Task not found" };
    }
    const category = await prisma.category.findUnique({ where: { id: categoryId } });
    if (!category) {
        throw { status: 404, message: "Category not found" };
    }
    return prisma.task.update({
        where: { id },
        data: {
            title,
            content,
            finished,
            categoryId
        }
    });
};

export const deleteTaskService = async (id: number) => {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) {
        throw { status: 404, message: "Task not found" };
    }
    return prisma.task.delete({ where: { id } });
};
