// External Dependencies
import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import Hotel from "../models/hotel";

// Global Config
export const hotelRouter = express.Router();

hotelRouter.use(express.json());

// GET
hotelRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const hotels = (await collections.hotels!.find({}).toArray()) as unknown as Hotel[];

        res.status(200).send(hotels.slice(0, 5));
    } catch (error) {
        res.status(500).send(error);
    }
});

// POST

// PUT

// DELETE