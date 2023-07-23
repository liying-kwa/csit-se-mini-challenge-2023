// External Dependencies
import express, { Request, Response } from "express";
import { collections } from "../services/database.service";
import Flight from "../models/flight";

// Global Config
export const flightRouter = express.Router();

flightRouter.use(express.json());

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
flightRouter.get("/", async (req: Request, res: Response) => {
    const departureDate = req.query.departureDate;
    const returnDate = req.query.returnDate;
    const destinationCity = req.query.destination;

    if (!departureDate || !returnDate || !destinationCity) {
        const errorMsg = "Missing parameters. Requires departureDate: string, returnDate: string, destination: string"
        res.status(400).send(errorMsg);
        return;
    }

    if (!validateIsoDateFormat(departureDate as string) || !validateIsoDateFormat(returnDate as string)) {
        const errorMsg = "Invalid parameters. departureDate and returnDate has to be in the following ISO Date format: YYYY-MM-DD"
        res.status(400).send(errorMsg);
        return;
    }

    try {
        // 1. Find the cheapest flight ticket from SG to <dest> on <departure date>. If no tickets, return empty array.
        const cheapestDepartureFlights = (await collections.flights!
            .find(
                {
                    srccity: "Singapore",
                    destcity: { '$regex': new RegExp('^' + destinationCity, "i") },
                    date: {
                        '$eq': new Date(departureDate as string),
                    }
                }
            )
            .sort({ price: 1 })
            .limit(1)   // assume no same-priced tickets for simplicity
            .toArray()) as unknown as Flight[];

        if (cheapestDepartureFlights.length == 0) {
            res.status(200).send([]);
            return;
        }

        // 2. Find the cheapest return flight from <dest> to SG on <return date>. If no tickets, return empty array.
        const cheapestReturnFlights = (await collections.flights!
            .find(
                {
                    srccity: { '$regex': new RegExp('^' + destinationCity, "i") },
                    destcity: 'Singapore',
                    date: {
                        '$eq': new Date(returnDate as string),
                    }
                }
            )
            .sort({ price: 1 })
            .limit(1)   // assume no same-priced tickets for simplicity
            .toArray()) as unknown as Flight[];

        if (cheapestReturnFlights.length == 0) {
            res.status(200).send([]);
            return;
        }

        // 3. Combine this information and return the required details
        const cheapestDepartureFlight = cheapestDepartureFlights[0];
        const cheapestReturnFlight = cheapestReturnFlights[0];
        const cheapestTwoWayFlights = [{
            "City": cheapestDepartureFlight.destcity,
            "Departure Date": departureDate,
            "Departure Airline": cheapestDepartureFlight.airlinename,
            "Departure Price": cheapestDepartureFlight.price,
            "Return Date": returnDate,
            "Return Airline": cheapestReturnFlight.airlinename,
            "Return Price": cheapestReturnFlight.price
        }]

        res.status(200).send(cheapestTwoWayFlights);
    } catch (error) {
        res.status(500).send(error);
    }
});

// POST

// PUT

// DELETE