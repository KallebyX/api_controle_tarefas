import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class TaskService {
  async createTask(data: { title: string; content: string; categoryId?: number }) {
    const task = await prisma.task.create({
      data,
    });
    return task;
  }

  async getAllTasks() {
    const tasks = await prisma.task.findMany({
      include: {
        category: true, // Inclui detalhes da categoria na resposta
      },
    });
    return tasks;
  }

  async getTaskById(id: number) {
    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
    return task;
  }

  async updateTask(id: number, data: { title?: string; content?: string; finished?: boolean; categoryId?: number | null }) {
    const task = await prisma.task.update({
      where: { id },
      data,
    });
    return task;
  }

  async deleteTask(id: number) {
    await prisma.task.delete({
      where: { id },
    });
  }
}

export const taskService = new TaskService();
