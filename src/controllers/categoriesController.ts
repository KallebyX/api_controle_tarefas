import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createCategory(categoryData: any) {
  try {
    const category = await prisma.category.create({
      data: categoryData,
    });
    return category;
  } catch (error) {
    throw new Error('Failed to create category');
  }
}

export async function deleteCategory(categoryId: number) {
  try {
    const category = await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
    return category;
  } catch (error) {
    throw new Error('Failed to delete category');
  }
}
