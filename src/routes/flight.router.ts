// External Dependencies
import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import Flight from "../models/flight";

// Global Config
export const flightRouter = express.Router();

flightRouter.use(express.json());

// GET
flightRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const flights = (await collections.flights!.find({}).toArray()) as unknown as Flight[];

        res.status(200).send(flights.slice(0, 5));
    } catch (error) {
        res.status(500).send(error);
    }
});

// POST

// PUT

// DELETE