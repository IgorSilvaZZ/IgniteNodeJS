import dayjs from "dayjs";

import { CarsRepositoryinMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryinMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/Implementations/DayjsDateProvider";
import { AppErrors } from "@shared/errors/AppErrors";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

let carsRepositoryInMemory: CarsRepositoryinMemory;

let createRentalUseCase: CreateRentalUseCase;

let dayJsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryinMemory();
        dayJsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayJsDateProvider,
            carsRepositoryInMemory
        );
    });

    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should be not able to create a new rental if there another open to the same user", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayAdd24Hours,
            });

            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppErrors);
    });

    it("should be not able to create a new rental if there another open to the same car", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "test",
                expected_return_date: dayAdd24Hours,
            });

            await createRentalUseCase.execute({
                user_id: "321",
                car_id: "test",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppErrors);
    });

    it("should be not able to create a new rental with invalid return time", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "test",
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppErrors);
    });
});
