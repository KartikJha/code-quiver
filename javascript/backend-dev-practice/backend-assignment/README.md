# OTT Platform "My List" Feature - Developer Evaluation Project

Welcome to the OTT Platform "My List" feature evaluation project. This project is designed to assess your problem-solving skills, debugging abilities, and overall proficiency in improving an existing codebase. The project is built using [NestJS](https://nestjs.com/), and your task will involve refining the current implementation and adding new features.

## Project Overview

This project simulates a basic OTT (Over-the-Top) platform where users can add content (movies, series, etc.) to their "My List" feature. The backend is implemented with NestJS, and we have already seeded the database with some initial data and models.

Your job will be to address existing issues, optimize the current code, and extend it by adding the required functionalities.

### What you will be working on:
- **Fix existing bugs** in the project.
- **Improve and optimize** the current implementation.
- **Add new features** to enhance the functionality of the "My List" feature.

## Getting Started

### Prerequisites

Before running the application, ensure you have the following prerequisites installed on your machine:

- Node.js v18 or above
- Docker
- Docker Compose

### Setting Up the Project

1. **Clone the repository** to your local machine:
   ```bash
   git clone <repository-url>


### Getting Started

To start the project locally, use the following command:

```bash
docker-compose up --build
```



### Swagger Documentation for existing apis
Swagger Documentation: http://127.0.0.1:3000/api


### API Endpoints to Be Developed
The application needs to expose the following API endpoints by the completion of this assignment:

- GET /list: Lists all items added to the user's list with pagination.
- POST /list: Adds items to the user's list.
- DELETE /list: Removes an item from the user's list.

### Detailed Requirements for the API:
- GET /list should include pagination support (e.g., limit and offset).
- POST /list must validate incoming data and ensure no duplicate items are added.
- DELETE /list should ensure proper validation of the item being removed and return meaningful responses.

### Existing Endpoints in the Application
You can use the following existing endpoints to interact with movies and TV shows:

- GET /movies: Lists all movies.
- POST /movies: Adds a new movie.
- GET /tvshows: Lists all TV shows.
- POST /tvshows: Adds a TV show.
Note: These endpoints are already implemented and should function correctly. Feel free to review and improve them where necessary.

## Evaluation Criteria
You will be evaluated based on the following aspects:

### 1. Code Quality
Readability: Code should be easy to read and understand. Use meaningful variable and function names, appropriate abstractions, and comments where necessary.
Structure: Follow NestJS best practices in terms of module and service organization. Adhere to SOLID principles and ensure that each class, function, and file has a clear responsibility.
DRY (Don't Repeat Yourself): Avoid code duplication. Look for ways to reuse existing logic where applicable.
### 2. Error Handling and Validation
Proper error handling should be in place for both synchronous and asynchronous operations. Use appropriate HTTP status codes for different error scenarios (e.g., 404 for not found, 400 for bad requests).
Data validation should be comprehensive, with clear error messages returned for invalid inputs (e.g., missing required fields or incorrect data types).
### 3. Testing
Implement unit tests for critical components, especially the "My List" feature.
Add integration tests for the new API endpoints.
Test coverage should be meaningful, and the test suite should be easy to run (npm run test).
### 4. Performance Optimization
Ensure that database queries are optimized and do not introduce performance bottlenecks, especially in the "My List" feature, where users may have large lists.
Look for opportunities to optimize code where applicable (e.g., using indexes for database queries).
### 5. Best Practices
Follow NestJS conventions for dependency injection, services, and controllers.
Use environment variables and proper configuration management (e.g., database credentials, environment-specific settings).
Adhere to RESTful API best practices in your implementation (e.g., using appropriate HTTP methods, status codes, and resource naming conventions).
### 6. Code Formatting and Linting
Ensure that the code is consistently formatted and follows a coding style guide. Prettier and ESLint are included in the project setup, and you should ensure there are no linting errors:

```bash
npm run lint
npm run format
```

Follow naming conventions for files, variables, and classes in the project.
### 7. Git Usage
Use meaningful commit messages that clearly describe the changes you've made.
Keep your commit history clean and logical. Avoid including unnecessary or temporary files in your commits.
Create a branch for your changes and submit a pull request for review.
### 8. Documentation
Update the Swagger documentation to reflect any new endpoints or changes.
Ensure your code is well-documented with appropriate inline comments where necessary, especially for complex logic.
Briefly explain your approach in the pull request description or commit messages.
### 9. Additional Improvements
Feel free to make suggestions or implement additional improvements that you believe will add value to the project. For example, caching frequently requested data, optimizing database indexing, or refactoring existing code.

## Submission
Once you have completed your work, push your changes to a new branch and submit a pull request. In your pull request description, include:

A brief overview of the changes you made.
Any challenges you faced and how you overcame them.
A description of any additional improvements or optimizations you made.

Good Luck!

Feel free to reach out if you have any questions or need clarification on the requirements. We're looking forward to reviewing your submission and evaluating how you tackle this task!


