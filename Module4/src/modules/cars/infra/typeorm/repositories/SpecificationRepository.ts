import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { getRepository, Repository } from "typeorm";
import {
    ISpecificationRepository,
    ICreateSpecificationDTO,
} from "../../../repositories/ISpecificationRepository";

class SpecificationRepository implements ISpecificationRepository {
    private repository: Repository<Specification>;

    private constructor() {
        this.repository = getRepository(Specification);
    }

    /* public static getInstance(): SpecificationRepository {
        if (!SpecificationRepository.INSTANCE) {
            SpecificationRepository.INSTANCE = new SpecificationRepository();
        }

        return SpecificationRepository.INSTANCE;
    } */

    async create({
        description,
        name,
    }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({
            description,
            name,
        });

        await this.repository.save(specification);
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({
            name,
        });
        return specification;
    }
}

export { SpecificationRepository };
