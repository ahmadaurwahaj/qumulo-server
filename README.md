# 🌋 Artifact Portal (Adonis JS) 🌋

## Getting Started

These instructions will get your copy of the Artifact Portal up and running on your local machine for development and testing purposes. Follow these simple steps:

### Prerequisites

Make sure you have Node.js installed on your system. We use [`nvm` (Node Version Manager)](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) to manage Node.js versions:

1. **Install and use the proper version of Node.js:**

   ```bash
   nvm install 20 && nvm use 20
   ```

   This command installs and switches to the Node.js version specified in the `.nvmrc` file located in the project's root directory.

2. **Install project dependencies:**

   ```bash
   npm install
   ```

   Using `npm install` helps ensure that your package versions match those in `package-lock.json`, providing a more consistent installation process.

3. **Start the application in development mode:**

   ```bash
   npm run dev
   ```

   This command compiles and launches the application, making it available at [http://localhost:3333](http://localhost:3333).


## Project Structure

Our project uses a structured directory layout to organize the various parts of the application. Below is an overview of the key directories and their intended purposes:

### Directory Structure

        .
        ├── ...
        ├───app/
        │   ├───Controllers
        │   ├───Models
        │   └───Validators
        │   └───Middlewears
        ├───config/
        ├───start/
        ├───storage/
        ├───tests/
        ...
        .# .env, package.json, .ace,
        .# .eslintrc, tsconfig.json, .gitignore,
        .# etc...
        ...
        └── README.md

## Creating Controllers

You can generate a controller using the AdonisJS CLI:

   ```bash
   node ace make:controller UserController
   ```

   This will create a file in app/Controllers/Http/UserController.ts. You can add methods to handle your routes inside this controller.


## Creating Validators

You can generate a validator using the AdonisJS CLI:

   ```bash
   node ace make:validator UserValidator
   ```

   This will create a file in app/Validators/Http/UserValidator.ts. You can add methods to handle your routes inside this validator.


   ## Creating Middlewares

You can generate a controller using the AdonisJS CLI:

   ```bash
  node ace make:middleware AuthMiddleware
   ```

   This will create a file in app/Middlewares/Http/AuthMiddleware.ts. You can add methods to handle your routes inside this middleware.

