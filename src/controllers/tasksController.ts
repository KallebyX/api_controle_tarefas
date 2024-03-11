import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createTask(taskData: any) {
  try {
    const task = await prisma.task.create({
      data: taskData,
    });
    return task;
  } catch (error) {
    throw new Error('Failed to create task');
  }
}

export async function getTasks(categoryName?: string) {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        category: true,
      },
      where: {
        category: {
          name: categoryName,
        },
      },
    });
    return tasks;
  } catch (error) {
    throw new Error('Failed to get tasks');
  }
}

// Implementar outras funções do controlador, como updateTask e deleteTask, conforme necessário
