# Mars Rover Application

This is a TypeScript implementation of the Mars Rover problem. The application allows you to input commands for multiple rovers to navigate a plateau on Mars. The rovers' positions and orientations are tracked, and their movements are validated to ensure they stay within the bounds of the plateau.

## Table of Contents

- [Architecture](#architecture)
- [Installation](#installation)
- [Flow of Execution](#flow-of-execution)
- [Dependencies](#dependencies)
- [Usage](#usage)
- [API](#api)
- [Testing](#testing)
- [Example](#example)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)

## Architecture

The application follows a modular architecture with the following key components:

- **Models:** Defines the data structures used in the application (`Plateau`, `Rover`, `Direction`, etc).
- **Controllers:** Manages the application logic (`RoverController`).
- **Services:** Contains the core functionality and business logic(`PlateauService`, `RoverService`, ).
  - `PlateauService` - Manages the plateau's dimensions and checks if a position is within bounds.
  - `RoverService` - Processes the commands for a single rover, updating its position and orientation.
  - `MarsRoverService>` - Central service with holds the Plateau and Rovers and orchestrates the movement of the rovers.
- **Utils:** Utility functions for parsing input and validating commands
- **Routes:** Defines the API endpoints (`roverRoutes`).
- **Exceptions:** Custom error classes for handling specific errors
  - `InvalidCommandError`: Thrown when an invalid command is encountered.
  - `InvalidPositionError`: Thrown when a rover moves out of bounds.

### Flow of Execution

1. **User Interface:** The user inputs commands via the web interface (`index.html`, `script.js`).
2. **API Call:** The commands are sent to the server via a POST request to `/api/voyager/exploreMars`.
3. **Controller:** The `ExploreMarsController` handles the request and uses the `MarsRoverService` to manage the Mars exploration (deploy and explore)
4. **Service:** The `MarsRoverService` uses the `PlateauService` to create the plateau and the `RoverService` to deploy and move the rovers.
5. **Response:** The final positions of the rovers are sent back to the client and displayed to the user.

## Dependencies

- **TypeScript:** A strongly typed programming language that builds on JavaScript.
- **Express:** A web application framework for Node.js.
- **Body-Parser:** A Node.js body parsing middleware.
- **Axios:** A promise-based HTTP client for the browser and Node.js.
- **Mocha:** A JavaScript test framework for Node.js programs.
- **Chai:** A BDD / TDD assertion library for Node.js.
- **Ts-Node:** TypeScript execution environment and REPL for Node.js.

## Installation

1. **Clone the repository:**
    ```sh
    git clone <repository_url>
    cd mars-rover
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Build the project:**
    ```sh
    npm run build
    ```

## Usage

1. **Start the server:**
    ```sh
    npm start
    ```

2. **Open your browser and navigate to:**
    ```
    http://localhost:3000
    ```

3. **Input your rover commands in the text area and click "Send Commands".**

## API

### POST /api/rovers/execute

#### Request
- **Body:**
    ```text
     "5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMRRMMRMRRM"    
    ```

#### Response
- **Body:**
    ```json
    {
      "output": [
        "1 3 N",
        "2 3 S"
      ]
    }
    ```

## Testing

1. **Run the tests:**
    ```sh
    npm test
    ```

The tests cover various scenarios including turning, moving, and executing command sequences.
