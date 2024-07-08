ShiftRX Test Project
This README provides instructions on how to set up and run the ShiftRX project using Docker Compose. The project consists of three main services: frontend, backend, and db (PostgreSQL database).

## Prerequisites

- Docker

- Docker Compose

## Services

1. Frontend **(Next.js)** - ./shiftrx-fe

2. Backend **(Nest.js)** - ./shiftrx-be

3. Database **(PostgreSQL)**

## Setup Instructions

1. Clone the repository

```bash
  git clone https://github.com/nicolasbuscaglia/shiftrx

  cd shiftrx
```

2. Build and Start the Services
   To build and start the services, run the following command from the root directory of the project:

```bash
  docker-compose up --build
```

This command will:

    Build the Docker images for the frontend and backend services using their respective Dockerfiles.

    Pull the postgres:15 image for the db service.

    Start all the services and link them together as defined in the docker-compose.yml file.

3. Access the Services

   Frontend: Open your web browser and go to http://localhost:3001

   Backend: The backend service will be running at http://localhost:3000

   Database: The PostgreSQL database will be accessible on port 5433 of your localhost.

4. Test Users

   After running the Docker Compose, a seed script is executed to populate the database with test data.

   username **user1** password **password1**

   username **user2** password **password2**

   A WebSocket is implemented to update the auction and bids in real-time whenever a new bid is placed by any user. Please test this functionality using two different browsers with separate test user accounts.

   In the root folder you can find a Postman collection with endpoint details.

## Notes

The postgres_data volume is used to persist the database data.

## Stopping the Services

To stop the services, press CTRL+C in the terminal where the services are running. To remove the containers, networks, and volumes defined in the docker-compose.yml file, run:

```bash
  docker-compose down -v
```

This command stops and removes all the containers, networks, and volumes created by docker-compose up.

## Troubleshooting

If you encounter any issues, please check the logs for each service by running:

```bash
  docker-compose logs <service-name>
```

Replace <service-name> with **frontend**, **backend**, or **db** to view the logs for the respective service.

## Contact

For any questions or issues, please contact buscaglia9@hotmail.com

This README file provides the necessary information to set up and run the ShiftRX project using Docker Compose.

Thank you!
