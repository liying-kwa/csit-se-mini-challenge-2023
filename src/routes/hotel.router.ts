// External Dependencies
import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import Hotel from "../models/hotel";

// Global Config
export const hotelRouter = express.Router();

hotelRouter.use(express.json());

// Helper functions
const validateIsoDateFormat = (dateString: string) => {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false;  // Invalid format
    var d = new Date(dateString);
    var dNum = d.getTime();
    if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0, 10) === dateString;
}

// GET
hotelRouter.get("/", async (req: Request, res: Response) => {
    const checkInDate = req.query.checkInDate;
    const checkOutDate = req.query.checkOutDate;
    const destinationCity = req.query.destination;

    if (!checkInDate || !checkOutDate || !destinationCity) {
        const errorMsg = "Missing parameters. Requires checkInDate: string, checkOutDate: string, destination: string"
        res.status(400).send(errorMsg);
        return;
    }

    if (!validateIsoDateFormat(checkInDate as string) || !validateIsoDateFormat(checkOutDate as string)) {
        const errorMsg = "Invalid parameters. departureDate and returnDate has to be in the following ISO Date format: YYYY-MM-DD"
        res.status(400).send(errorMsg);
        return;
    }

    try {
        // 1. Find the cheapest hotel to stay from <check in date> to <check out date> in <destination city>.
        const cheaptestHotelPrices = (await collections.hotels!
            .aggregate([
                {
                    '$match': {
                        city: destinationCity,
                        date: {
                            '$gte': new Date('2023-12-10'),
                            '$lte': new Date('2023-12-16')
                        }
                    }
                },
                {
                    '$group': {
                        _id: "$hotelName",
                        price: { '$sum': "$price" }
                    }
                }
            ])
            .sort({ price: 1 })
            .limit(1)   // assume no same-priced tickets for simplicity
            .toArray());

        // 2. Combine this information and return the required details
        const cheapestHotelPrice = cheaptestHotelPrices[0]
        const cheapestHotels = [{
            "City": destinationCity,
            "Check In Date": checkInDate,
            "Check Out Date": checkOutDate,
            "Hotel": cheapestHotelPrice._id,
            "Price": cheapestHotelPrice.price
        }]

        res.status(200).send(cheapestHotels);
    } catch (error) {
        res.status(500).send(error);
    }
});

// POST

// PUT

// DELETE