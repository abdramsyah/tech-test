# Project Name

## Backend (Node.js with Express)

### Prerequisites
- Node.js
- Docker (for PostgreSQL and pgAdmin)

### Setup

1. **Install dependencies:**
    ```bash
    npm install
    ```

2. **Create the database:**
    ```bash
    npx sequelize db:create
    ```

3. **Run migrations:**
    ```bash
    npx sequelize db:migrate
    ```

4. **Seed the database:**
    ```bash
    npx sequelize db:seed:all
    ```

5. **Start the server:**
    - For development:
      ```bash
      npm run dev
      ```
    - For production:
      ```bash
      npm run start
      ```

## Frontend

### Prerequisites
- Node.js

### Setup

1. **Install dependencies:**
    ```bash
    npm install
    ```

2. **Build the project:**
    ```bash
    npm run build
    ```

3. **Start the server:**
    ```bash
    npm run start
    ```

    Alternatively, for development:
    ```bash
    npm install
    npm run dev
    ```

## Running PostgreSQL and pgAdmin with Docker

### Prerequisites
- Docker

### Setup

1. **Create a `docker-compose.yml` file with the following content:**

    ```yaml
    version: "1"

    name: "postgresdb"
    services:
      postgres:
        container_name: "postgres"
        image: "postgres:14"
        environment:
          - POSTGRES_USER=postgres
          - POSTGRES_PASSWORD=postgres
        ports:
          - "5432:5432"
        volumes:
          - "C:/Users/selal/Documents/Databases/postgresql:/var/lib/postgresql/data"
        # restart: always

      pgadmin:
        container_name: pgadmin
        image: "dpage/pgadmin4"
        environment:
          - PGADMIN_DEFAULT_EMAIL=admin@admin.com
          - PGADMIN_DEFAULT_PASSWORD=root
        ports:
          - "8083:80"
        # restart: always
    ```

2. **Run Docker Compose:**
    ```bash
    docker-compose up
    ```

3. **Access pgAdmin:**
   - Open your web browser and go to `http://localhost:8083`
   - Log in with the email `admin@admin.com` and password `root`
   - Add a new server with the following details:
     - Name: `postgres`
     - Host: `postgres`
     - Port: `5432`
     - Username: `postgres`
     - Password: `postgres`

## Additional Notes

- Ensure the backend is running before starting the frontend to avoid any API connection issues.
- The backend is configured to allow cross-origin requests from `http://localhost:3005/login`.
