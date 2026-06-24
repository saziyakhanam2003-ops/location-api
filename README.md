# Location API

A REST API built with NestJS, TypeORM and PostgreSQL for managing hierarchical location data.

## Features

- Countries Management
- States Management
- Districts Management
- Subdistricts Management
- Villages Management

## Advanced Features

- Search
- Pagination
- Sorting
- Filtering
- Swagger Documentation

## Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Swagger

## API Endpoints

### Countries

GET /countries

POST /countries

### States

GET /states

GET /states/:id

POST /states

PATCH /states/:id

DELETE /states/:id

### Districts

GET /districts

GET /districts/:id

POST /districts

PATCH /districts/:id

DELETE /districts/:id

### Subdistricts

GET /subdistricts

GET /subdistricts/:id

POST /subdistricts

PATCH /subdistricts/:id

DELETE /subdistricts/:id

### Villages

GET /villages

GET /villages/:id

POST /villages

PATCH /villages/:id

DELETE /villages/:id

## Query Features

Examples:

GET /states?countryId=1

GET /states?search=Raj

GET /states?page=1&limit=10

GET /states?sortBy=name&order=ASC

## Swagger

http://localhost:3000/api

## Author

Saziya Khanam