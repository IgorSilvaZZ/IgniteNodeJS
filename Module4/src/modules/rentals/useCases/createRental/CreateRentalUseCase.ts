import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppErrors } from "@shared/errors/AppErrors";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_data: Date;
}

class CreateRentalUseCase {
    constructor(private rentalsRepository: IRentalsRepository) {}

    async execute({
        user_id,
        car_id,
        expected_return_data,
    }: IRequest): Promise<void> {
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
    }
}

export { CreateRentalUseCase };
