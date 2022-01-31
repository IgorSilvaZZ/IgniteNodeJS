import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppErrors } from "@shared/errors/AppErrors";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { authorization } = req.headers;

    if (!authorization) {
        throw new AppErrors("Token missing!", 401);
    }

    const [, token] = authorization.split(" ");

    try {
        const { sub: user_id } = verify(
            token,
            "0e8a93adb74c0c7b034082c474391874"
        ) as IPayload;

        const usersRepository = new UsersRepository();

        if (!(await usersRepository.findById(user_id))) {
            throw new AppErrors("User does not exists!", 401);
        }

        req.user = {
            id: user_id,
        };

        next();
    } catch (error) {
        throw new AppErrors("Invalid token!", 401);
    }
}
