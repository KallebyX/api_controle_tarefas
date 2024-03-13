import { Request, Response, NextFunction } from 'express';
import { createCategoryService, deleteCategoryService } from '../services/categoriesService';

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        const category = await createCategoryService(name);
        res.status(201).json(category);
    } catch (err) {
        next(err);
    }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await deleteCategoryService(parseInt(id));
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};
