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
    }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({
            description,
            name,
        });

        await this.repository.save(specification);

        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({
            name,
        });
        return specification;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.findByIds(ids);

        return specifications;
    }
}

export { SpecificationRepository };
