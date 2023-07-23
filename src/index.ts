import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from "./services/database.service"
import { flightRouter } from "./routes/flight.router";
import { hotelRouter } from "./routes/hotel.router";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

connectToDatabase()
    .then(() => {
        app.use("/flight", flightRouter);
        app.use("/hotel", hotelRouter);

        app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });