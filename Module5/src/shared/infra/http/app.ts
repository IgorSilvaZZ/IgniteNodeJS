import "reflect-metadata";

import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import { AppErrors } from "@shared/errors/AppErrors";
import { router } from "@shared/infra/http/routes";
import createConnection from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";

import "@shared/container";

createConnection();

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppErrors) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }

    return res.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`,
    });
});

export { app };
