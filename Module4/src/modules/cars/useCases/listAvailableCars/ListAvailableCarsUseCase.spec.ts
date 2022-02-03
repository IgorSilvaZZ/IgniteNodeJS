import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { CarsRepositoryinMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryinMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryinMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe("List Cars", () => {
    beforeAll(() => {
        carsRepositoryInMemory = new CarsRepositoryinMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
    });

    it("Should be able list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car",
            description: "Car description",
            daily_rate: 140.0,
            license_plate: "DEF-1212",
            fine_amount: 100,
            brand: "Car_brand",
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("Should be able to list available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "Car description",
            daily_rate: 140.0,
            license_plate: "DEF-1213",
            fine_amount: 100,
            brand: "Car_brand_test",
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car_brand_test",
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Car description",
            daily_rate: 140.0,
            license_plate: "DEF-1214",
            fine_amount: 100,
            brand: "Car_brand_test",
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car3",
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Car description",
            daily_rate: 140.0,
            license_plate: "DEF-1214",
            fine_amount: 100,
            brand: "Car_brand_test",
            category_id: "123456",
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "123456",
        });

        expect(cars).toEqual([car]);
    });
});
