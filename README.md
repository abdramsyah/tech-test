# Project Name

## Backend (Node.js with Express)

### Prerequisites
- Node.js
- PostgreSQL (or another database supported by Sequelize)

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

## Additional Notes

- Ensure the backend is running before starting the frontend to avoid any API connection issues.
- The backend is configured to allow cross-origin requests from `http://localhost:3005/login`.

