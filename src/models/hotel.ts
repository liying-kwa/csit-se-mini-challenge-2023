import { ObjectId } from "mongodb";

export default class Hotel {
    constructor(
        public city: string,
        public hotelName: string,
        public price: number,
        public date: Date,
        public id?: ObjectId) { }
}