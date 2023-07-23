# CSIT Software Engineer Mini Challenge 2023

## About the challenge
https://www.csit.gov.sg/events/csit-mini-challenge
https://se-mini-challenge.csit-events.sg/

## How to run the Express server
`npm run start`

## Endpoints

### GET /flight
Get a list of return flights at the cheapest price, given the destination city, departure date, and arrival date.

#### Query Parameters:
| Field         | Type   | Description                                                      |
|---------------|--------|------------------------------------------------------------------|
| departureDate | String | Departure date from Singapore. ISO date format (YYYY-MM-DD).     |
| returnDate    | String | Return date from destination city. ISO date format (YYYY-MM-DD). |
| destination   | String | Destination city. Case-insensitive.                              |

#### Responses

##### Status codes
| Status Code | Description                                                                             |
|-------------|-----------------------------------------------------------------------------------------|
| 200         | Query successful. Returns when there are 0 or more results in the returned array.       |
| 400         | Bad input. Returns when there are missing query parameters or date format is incorrect. |

##### Response Format
Returns an array containing the details of the cheapest return flights. There can be 0 or more items returned.

Example Query
```
/flight?departureDate=2023-12-10&returnDate=2023-12-16&destination=Frankfurt
```

Example Response
```json
[
  {
    "City": "Frankfurt",
    "Departure Date": "2023-12-10",
    "Departure Airline": "US Airways",
    "Departure Price": 1766,
    "Return Date": "2023-12-16",
    "Return Airline": "US Airways",
    "Return Price": 716
  }
]
```

### GET /hotel
Get a list of hotels providing the cheapest price, given the destination city, check-in date, and check-out date.

#### Query Parameters:
| Field        | Type   | Description                                                     |
|--------------|--------|-----------------------------------------------------------------|
| checkInDate  | String | Date of check-in at the hotel. ISO date format (YYYY-MM-DD).    |
| checkOutDate | String | Date of check-out from the hotel. ISO date format (YYYY-MM-DD). |
| destination  | String | Destination city. Case-insensitive.                             |

#### Responses

##### Status codes
| Status Code | Description                                                                             |
|-------------|-----------------------------------------------------------------------------------------|
| 200         | Query successful. Returns when there are 0 or more results in the returned array.       |
| 400         | Bad input. Returns when there are missing query parameters or date format is incorrect. |

##### Response Format
Returns an array containing the details of the cheapest hotels. There can be 0 or more items returned.

Example Query
```
/hotel?checkInDate=2023-12-10&checkOutDate=2023-12-16&destination=Frankfurt
```

Example Response
```json
[
  {
    "City": "Frankfurt",
    "Check In Date": "2023-12-10",
    "Check Out Date": "2023-12-16",
    "Hotel": "Hotel J",
    "Price": 2959
  }
]
```