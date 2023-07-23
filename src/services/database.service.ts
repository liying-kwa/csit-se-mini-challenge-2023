// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { flights?: mongoDB.Collection, hotels?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase() {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING!);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const flightsCollection: mongoDB.Collection = db.collection(process.env.FLIGHTS_COLLECTION_NAME!);
    collections.flights = flightsCollection;

    const hotelsCollection: mongoDB.Collection = db.collection(process.env.HOTELS_COLLECTION_NAME!);
    collections.hotels = hotelsCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collections: ${flightsCollection.collectionName}, ${hotelsCollection.collectionName}`);
}