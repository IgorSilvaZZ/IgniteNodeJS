import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { AppErrors } from "../../../../errors/AppErrors";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        name,
        email,
        password,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        const userAlredyExists = await this.usersRepository.findByEmail(email);

        if (userAlredyExists) {
            throw new AppErrors("User Already Exists");
        }

        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
            driver_license,
        });
    }
}

export { CreateUserUseCase };
