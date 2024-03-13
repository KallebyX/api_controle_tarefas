import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const CategorySchema = z.object({
  name: z.string(),
});

export class CategoryController {
  static createCategory = async (req: Request, res: Response) => {
    try {
      const parsedData = CategorySchema.parse(req.body);
      const category = await prisma.category.create({
        data: parsedData,
      });
      return res.status(201).json(category);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  static deleteCategory = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await prisma.category.delete({
        where: { id: Number(id) },
      });
      return res.status(204).send();
    } catch (error) {
      // Verifica se o erro é devido à tentativa de deletar uma categoria que não existe
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Category not found' });
      }
      return res.status(400).json({ message: error.message });
    }
  };
}
