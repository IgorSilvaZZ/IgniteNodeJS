import { Category } from "../model/Category";

// DTO => Data transfer object
interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    findByName(name: string): Category;
    list(): Category[];
    create({ description, name }: ICreateCategoryDTO): void;
}

export { ICategoriesRepository, ICreateCategoryDTO };
