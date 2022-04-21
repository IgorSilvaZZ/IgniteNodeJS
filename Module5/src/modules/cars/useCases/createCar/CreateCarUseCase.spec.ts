import { CarsRepositoryinMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryinMemory";
import { AppErrors } from "@shared/errors/AppErrors";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUse: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryinMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryinMemory();
        createCarUse = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("Should be able to create new car", async () => {
        const car = await createCarUse.execute({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
        });

        expect(car).toHaveProperty("id");
    });

    it("Should not be able to create a car with exists license plate", async () => {
        expect(async () => {
            await createCarUse.execute({
                name: "Name Car",
                description: "Description Car",
                daily_rate: 100,
                license_plate: "ABC",
                fine_amount: 60,
                brand: "Brand",
                category_id: "category",
            });

            await createCarUse.execute({
                name: "Name Car 2",
                description: "Description Car",
                daily_rate: 100,
                license_plate: "ABC",
                fine_amount: 60,
                brand: "Brand",
                category_id: "category",
            });
        }).rejects.toBeInstanceOf(AppErrors);
    });

    it("Should not be able to create a car with available true by default", async () => {
        const car = await createCarUse.execute({
            name: "Car Available",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
        });

        expect(car.available).toBe(true);
    });
});
