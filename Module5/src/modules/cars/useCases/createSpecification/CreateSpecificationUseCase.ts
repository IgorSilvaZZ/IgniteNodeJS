import { inject, injectable } from "tsyringe";

import { AppErrors } from "@shared/errors/AppErrors";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationRepository")
        private specificationsRepository: ISpecificationRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreadyExists =
            await this.specificationsRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new AppErrors("Specification already exists!");
        }

        this.specificationsRepository.create({
            name,
            description,
        });
    }
}

export { CreateSpecificationUseCase };
