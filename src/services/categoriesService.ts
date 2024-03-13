import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createCategoryService = async (name: string) => {
    return prisma.category.create({
        data: {
            name
        }
    });
};

export const deleteCategoryService = async (id: number) => {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
        throw { status: 404, message: "Category not found" };
    }
    return prisma.category.delete({ where: { id } });
};
