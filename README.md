# 🌋 Artifact Portal (AdonisJS Backend) 🌋

Welcome to the Artifact Portal backend! This project serves as the backend for managing and monitoring clusters using AdonisJS. It provides API endpoints for various functionalities, such as time series data visualization, snapshot policy management, and more.

## 🚀 Getting Started

These instructions will guide you to set up and run the Artifact Portal backend locally for development and testing purposes.

### Prerequisites

Make sure you have the following tools installed on your system:

- Node.js: We use nvm (Node Version Manager) to manage Node.js versions.

### Installation

1. Install and use the proper version of Node.js:

   ```bash
   nvm install 20 && nvm use 20
   ```

   This command installs and switches to the Node.js version specified in the `.nvmrc` file located in the project's root directory.

2. Install project dependencies:

   ```bash
   npm install
   ```

   This command installs all necessary packages based on the `package.json` and `package-lock.json` files.

3. Add .env provided in email

4. Start the application in development mode:

   ```bash
   npm run dev
   ```

   This command starts the AdonisJS application, making it available at `http://localhost:3333`.

5. Configure the environment variables:

   Create a `.env` file in the root directory and copy the contents from `.env.example`. Update the values based on your local environment configuration.

   ```bash
   cp .env.example .env
   ```

## 📂 Project Structure

The project is organized into several directories, each serving a distinct purpose to maintain a clear and scalable structure.

### Key Directories

```
.
├── app/
│   ├── Controllers/Http        # Application controllers handling HTTP requests
│   ├── Models                  # ORM models for managing data interactions
│   ├── Services                # Business logic and data processing services
│   ├── Validators              # Schema-based request validation
│   ├── Middleware              # Custom application middleware
│   └── Exceptions              # Error handling logic
│
├── config/                     # Application configuration files
├── database/                   # Database migration and seed files
├── public/                     # Public assets and files
├── storage/                    # Storage for JSON data, uploads, etc.
├── start/                      # Application start hooks and service providers
├── tests/                      # Automated tests
└── .env                        # Environment variables file
```

## 📚 Creating Essential Components

### Creating Controllers

Generate a controller using the AdonisJS CLI:

```bash
node ace make:controller MetricsController
```

This creates a file in `app/Controllers/Http/MetricsController.ts`. Add methods to handle your routes and logic within this file.

### Creating Services

Services are placed in `app/Services` and handle business logic or data interactions. Create a service manually or by using the AdonisJS CLI to keep your controller thin and focused.

### Creating Validators

Generate a validator using the AdonisJS CLI:

```bash
node ace make:validator SnapshotPolicyValidator
```

This creates a file in `app/Validators/SnapshotPolicyValidator.ts`. Add validation schemas using tools like `@ioc:Adonis/Core/Validator` to ensure data integrity.

### Creating Middleware

Generate middleware using the AdonisJS CLI:

```bash
node ace make:middleware AuthMiddleware
```

This creates a file in `app/Middleware/AuthMiddleware.ts`. Add your authentication logic here to protect routes.

## 🗂 Data Handling

The application uses the file system to manage and store JSON data. You can find the relevant files in the `storage/` directory. We also utilize utility functions to read and write data efficiently, ensuring that the application can handle large datasets with ease.

### Using Utility Functions

We have centralized reusable functions in the `app/Utils` folder. For instance, the `readDataFromFile` function helps read JSON files consistently across the application.

## 📈 API Endpoints

The backend exposes various API endpoints to support the frontend's needs. Some of the notable features include:

- Time Series Graphs: Provides endpoints to retrieve IOPS and throughput data over time.
- Snapshot Policy Management: Offers CRUD operations to manage snapshot policies, with features like snapshot locking and policy scheduling.

Refer to the endpoint documentation for details on the available routes, request parameters, and responses.

## ⚙️ Engineering Practices

We adhere to the following best practices throughout the codebase:

- Type Safety: The project uses TypeScript for type safety and to catch errors at compile time.
- Data Validation: All incoming requests are validated using AdonisJS validators to ensure data integrity.
- Loading and Error States: We handle loading and error states gracefully, ensuring a smooth user experience.
- Utility-Driven: Common functions are refactored into utility modules, promoting DRY principles and maintainability.
- Code Linting and Formatting: We have integrated ESLint and Prettier to enforce coding standards and maintain consistency across the codebase.
- Streamlined Project Structure: The folder structure is designed to scale, allowing more features and pages to be added effortlessly.
- API Security: API can only be accessed using API key, no unauthorised user can access APIs.

## 🧪 Testing

Automated tests are placed in the `tests/` directory. We encourage Test-Driven Development (TDD) to improve code reliability and minimize bugs. To run tests:

```bash
npm run test
```

This command executes all test suites, ensuring that your changes don't break existing functionality.

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.
