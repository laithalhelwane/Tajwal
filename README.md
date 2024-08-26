# Tajwal - RESTful API

Tajwal is a RESTful API for an innovative application that redefines the shopping and roaming experience. Instead of spending excessive time and money visiting markets physically, Tajwal helps users locate stores and products efficiently from the comfort of their devices.

This API manages user interactions with stores and products, leveraging various technologies for security, validation, and seamless performance.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Security](#security)

## Features

- User authentication and authorization using JWT
- Store and product management (add, update, delete, retrieve)
- Zod-based validation for schema enforcement
- User-friendly API documentation via Swagger
- Secure password hashing with bcrypt
- Efficient logging with Pino
- MongoDB as the database for storing user, store, and product information

## Technologies Used

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB**
- **Zod** - Data validation
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Pino** - Logging
- **Lodash** - Utility library
- **Passport.js** - Authentication middleware
- **Swagger** - API documentation
- **Config** - Centralized configuration management

## Prerequisites

- Node.js v14.x or higher
- MongoDB installed locally or a cloud MongoDB instance (e.g., MongoDB Atlas)
- TypeScript installed globally (`npm install -g typescript`)
- A working Firebase project for notifications (optional)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/laithalhelwane/Tajwal.git
cd Tajwal
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables and default settings (See [Configuration](#configuration)).

## Configuration

Before you begin development, configure the environment variables and the default configuration settings.

1. Create a `config` directory and initialize the `default.json` file:

```bash
mkdir config
vi config/default.json
```

2. In `config/default.json`, add your default configuration values:

```json
{
    "port": 1337,
    "dbUri": "mongodb://localhost:27017/Tajwal",
    "recUri": "http://localhost:5000",
    "saltWorkFactor": 10,
    "accessTokenTtl": "1y",
    "refreshTokenTtl": "1y",
    "privateKey": "-----BEGIN RSA PRIVATE KEY-----
                   -----END RSA PRIVATE KEY-----",
    "publicKey": "-----BEGIN PUBLIC KEY-----
                  -----END PUBLIC KEY-----",
}
```

Make sure to set these values properly in accordance with your environment (development, production, etc.).

## Running the Project

### Development Mode

To run the project in development mode with live reloading:

```bash
npm run dev
```

### Production Mode

To build and run the project for production:

```bash
npm start
```

## API Documentation

The full REST API documentation is provided via Swagger. After running the project, you can access the documentation at:

``` 
http://localhost:${PORT}/docs
```

This provides details on all available endpoints, including routes for user, store, and product management.

## Logging

This project uses **Pino** for logging. Logs will be outputted in the console and saved to files for tracking and debugging purposes. Configure the logging level and output format in the configuration file.

## Security

This project uses **JWT** for authentication and **bcrypt** for securely hashing passwords. Ensure that the `JWT_SECRET` is set to a strong, random string in production. Consider using environment variables
