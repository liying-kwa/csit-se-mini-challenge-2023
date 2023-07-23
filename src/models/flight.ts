import { ObjectId } from "mongodb";

export default class Flight {
    constructor(
        public airline: string,
        public airlineid: number,
        public srcairport: string,
        public srcairportid: number,
        public destairport: string,
        public destairportid: number,
        public codeshare: string,
        public stop: number,
        public eq: string,
        public airlinename: string,
        public srcairportname: string,
        public srccity: string,
        public srccountry: string,
        public destairportname: string,
        public destcity: string,
        public destcountry: string,
        public price: number,
        public date: Date,
        public id?: ObjectId) { }
}