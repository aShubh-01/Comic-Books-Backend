# Comic Book Store Backend

**Internship Assignment by Mango Jelly**

## Overview

The Comic Book Store Backend is a RESTful API built using Express, Prisma, and Zod for data validation. This project allows for CRUD operations on comic book data, making it easy to manage a comic book store's inventory. The API is optimized for performance using Redis caching and includes pagination support for efficient data fetching.

## Features

- **CRUD Operations:** Create, Read, Update, and Delete comic books using five endpoints.
- **Data Validation:** Implemented with Zod to ensure data integrity and validation for all incoming requests.
- **Caching with Redis:** Utilizes Redis for caching data, providing faster and optimized data fetching.
- **Pagination Support:** Allows for efficient retrieval of large datasets through offset and limit parameters.

## Endpoints

The API includes the following endpoints:

1. **Create Comic Book**
   - **Method:** POST
   - **Endpoint:** `/create`
   - **Description:** Adds a new comic book to the database.

2. **Get All Comic Books**
   - **Method:** GET
   - **Endpoint:** `/list`
   - **Description:** Retrieves a list of all comic books, with optional filtering and pagination.

3. **Get Comic Book by ID**
   - **Method:** GET
   - **Endpoint:** `/details/:id`
   - **Description:** Fetches a specific comic book by its ID.

4. **Update Comic Book**
   - **Method:** PUT
   - **Endpoint:** `/update/:id`
   - **Description:** Updates the details of a specific comic book.

5. **Delete Comic Book**
   - **Method:** DELETE
   - **Endpoint:** `/delete/:id`
   - **Description:** Removes a specific comic book from the database.

## Setup Instructions

To set up the project locally, follow these steps:

### Prerequisites

1. **Node.js:** Ensure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
2. **Redis:** Install Redis to enable caching functionality. Instructions can be found on the [Redis installation page](https://redis.io/docs/getting-started/installation/).
3. **Prisma Database URL:** Obtain your Prisma database connection string (typically in the `.env` file).

### Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/aShubh-01/Comic-Books-Backend.git
   cd Comic-Books-Backend
2. **Install Dependencies*
   - npm install
3. **Setup environment**
   - Create an .env file and specify your postgreSQL database url as DATABASE_URL="your_url"
   - Start your redis server
4. **Build and Run**
   - npm run build
   - npm run dev/npm run start
