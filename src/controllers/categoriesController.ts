export const createCategory = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body;

    try {
        const category = await prisma.category.create({
            data: {
                name,
            },
        });

        res.status(201).json(category);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            res.status(409).json({ message: "Category name must be unique." });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};
