import { AppErrors } from "@errors/AppErrors";
import { CategoriesReposityInMemory } from "@modules/cars/repositories/in-memory/CategoriesReposityInMemory";
import { CreateCategoryUseCase } from "@modules/cars/useCases/createCategory/CreateCategoryUseCase";

describe("Create Category", () => {
    let createCategoryUseCase: CreateCategoryUseCase;
    let categoriesReposityInMemory: CategoriesReposityInMemory;

    beforeEach(() => {
        categoriesReposityInMemory = new CategoriesReposityInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesReposityInMemory
        );
    });

    it("should be able to create a new category", async () => {
        const category = {
            name: "Category Test",
            description: "Category description Test",
        };
        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        const categoryCreated = await categoriesReposityInMemory.findByName(
            category.name
        );

        expect(categoryCreated).toHaveProperty("id");
    });

    it("should not be able to create a new category with name exists", async () => {
        expect(async () => {
            const category = {
                name: "Category Test",
                description: "Category description Test",
            };

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
        }).rejects.toBeInstanceOf(AppErrors);
    });
});
