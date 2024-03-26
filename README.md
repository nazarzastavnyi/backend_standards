# Backend Standards for Node.js Server

This project establishes a set of standards and best practices for developing backend Node.js servers. It encompasses a structured architecture, essential dependencies, linting, testing, and integration with SonarQube for ensuring code quality and adherence to industry standards.

## Dependencies

The project utilizes various dependencies to streamline development, testing, and deployment processes. Key dependencies include:

- **Express**: A fast, unopinionated, minimalist web framework for Node.js, facilitating the creation of robust APIs.
- **Mongoose**: An elegant MongoDB object modeling tool designed to work in an asynchronous environment, providing a straightforward schema-based solution.
- **jsonwebtoken**: Implementation of JSON Web Tokens (JWT) for secure authentication and authorization.
- **bcrypt**: A library for hashing passwords securely, essential for storing sensitive user data.
- **Joi**: A schema description language and validator for JavaScript objects, ensuring data integrity and validation.
- **Swagger UI Express**: Middleware for serving auto-generated API documentation, enhancing API discoverability and usability.
- **dotenv**: Module for loading environment variables from a `.env` file, enhancing configuration management.
- **ts-node**: Enables execution of TypeScript code directly without prior transpilation to JavaScript, enhancing development efficiency.
- **Mocha** and **Chai**: Test framework and assertion library, respectively, for writing unit and integration tests.
- **sinon**: Library for spies, stubs, and mocks in JavaScript tests, facilitating test-driven development practices.
- **eslint**: A pluggable JavaScript linter that identifies and reports on patterns in JavaScript code, ensuring code quality and consistency.
- **tslog**: A TypeScript-friendly logging utility, enhancing visibility into application runtime behavior.

## Project Structure

The project adheres to a modular structure organized within the `src` directory, featuring separate modules for controllers, enums, interfaces, models, services, and validation logic. This structure promotes code reusability, maintainability, and scalability, facilitating easier navigation and modification.

## Scripts

The project defines various npm scripts to automate common development tasks:

- `build`: Transpiles TypeScript code to JavaScript.
- `deploy`: Executes the server in a production environment.
- `debug`: Launches the server in debug mode with automatic restarts using Nodemon.
- `lint`: Lints TypeScript files using ESLint to enforce coding standards and best practices.
- `start`: Lints the codebase and initiates the server in debug mode.
- `fix`: Automatically fixes linting errors where possible.
- `test`: Executes unit and integration tests using Mocha, Chai, and sinon with environment variables set for testing.

***Environment values***<br/>
```
PORT=8080
DB_URL=
SWAGGER=true
JWT_SECRET=
```
