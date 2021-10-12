import fs from "fs";
import csvParse from "csv-parse";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
    name: string;
    description: string;
}

class ImportCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            //Criar um stream do arquivo que está sendo passado
            //Ler parte por parte (chunks)
            const stream = fs.createReadStream(file.path);

            const categories: IImportCategory[] = [];

            //Criar um parse do arquivo csv com a lib
            const parseFile = csvParse();

            //Cada parte do arquivo lido fazer algo com essa parte
            stream.pipe(parseFile);

            //Pegar as linhas lidas com o parseFile e salva em um array com as linhas
            parseFile
                .on("data", async (line) => {
                    //["name", "description"]

                    const [name, description] = line;

                    categories.push({ name, description });
                })
                .on("end", () => {
                    resolve(categories);
                })
                .on("error", (err) => {
                    reject(err);
                });
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);

        categories.map(async (category) => {
            const { name, description } = category;
            const existsCategory = this.categoriesRepository.findByName(name);

            if (!existsCategory) {
                this.categoriesRepository.create({
                    name,
                    description,
                });
            }
        });
    }
}

export { ImportCategoryUseCase };
