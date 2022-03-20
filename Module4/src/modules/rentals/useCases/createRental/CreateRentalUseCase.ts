import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppErrors } from "@shared/errors/AppErrors";
import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_data: Date;
}
@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute({
        user_id,
        car_id,
        expected_return_data,
    }: IRequest): Promise<Rental> {
        const minimumHour = 24;

        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
            car_id
        );

        if (carUnavailable) {
            throw new AppErrors("Car is unavailable!");
        }

        const rentalOpenToUser =
            await this.rentalsRepository.findOpenRentalByUser(user_id);

        if (rentalOpenToUser) {
            throw new AppErrors("There's rental in progress for user!");
        }

        const dateNow = this.dateProvider.dateNow();

        // Comparando duas datas utlizando o diff assim convertendo essa comparação em horas
        const compare = this.dateProvider.compareInHours(
            dateNow,
            expected_return_data
        );

        if (compare < minimumHour) {
            throw new AppErrors("Invalid return time!");
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_data,
        });

        return rental;
    }
}

export { CreateRentalUseCase };
