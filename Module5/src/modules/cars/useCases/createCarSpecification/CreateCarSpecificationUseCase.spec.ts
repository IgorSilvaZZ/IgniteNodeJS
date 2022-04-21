import { CarsRepositoryinMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryinMemory";
import { SpecificationsInMemory } from "@modules/cars/repositories/in-memory/SpecificationsInMemory";
import { AppErrors } from "@shared/errors/AppErrors";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let carsRepositoryInMemory: CarsRepositoryinMemory;
let specificationsRepositoryInMemory: SpecificationsInMemory;

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create Car Specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryinMemory();
        specificationsRepositoryInMemory = new SpecificationsInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationsRepositoryInMemory
        );
    });

    it("Should not able to add a new specification to a now-existent car", async () => {
        expect(async () => {
            const car_id = "123";
            const specifications_id = ["54321"];

            await createCarSpecificationUseCase.execute({
                car_id,
                specifications_id,
            });
        }).rejects.toBeInstanceOf(AppErrors);
    });

    it("Should be able to add a new specification", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
        });

        const specification = await specificationsRepositoryInMemory.create({
            description: "test",
            name: "test",
        });

        const car_id = car.id;
        const specifications_id = [specification.id];

        const specificationsCars = await createCarSpecificationUseCase.execute({
            car_id,
            specifications_id,
        });

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    });
});
