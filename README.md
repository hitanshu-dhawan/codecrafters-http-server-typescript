# HTTP Server in TypeScript

This project is a simple HTTP server built from scratch in TypeScript, as part of the CodeCrafters "Build your own HTTP server" challenge.

## Features

The server supports the following features:

- **Concurrent Connections**: Can handle multiple clients connecting at the same time.
- **Endpoint Routing**:
    - `GET /`: Responds with a 200 OK status.
    - `GET /echo/{str}`: Echoes back the given string. Supports `gzip` compression.
    - `GET /user-agent`: Responds with the client's User-Agent.
    - `GET /files/{filename}`: Serves a file from a specified directory.
    - `POST /files/{filename}`: Creates a file in a specified directory with the request body content.
- **Command-line Arguments**: Accepts a `--directory <directory_path>` argument to specify the directory for file operations.

## How to Run

1.  **Prerequisites**:
    - [Bun](https://bun.sh/) installed on your machine.
    - Node.js and npm (for installing dependencies if you don't use Bun).

2.  **Installation**:

    ```bash
    bun install
    ```

3.  **Running the server**:

    ```bash
    ./your_program.sh --directory /path/to/your/files
    ```

    Replace `/path/to/your/files` with the actual path to the directory you want the server to use for file operations.

## Project Structure

```
.
├── app
│   └── main.ts         # The main entry point of the application
├── your_program.sh     # Script to run the server locally
├── package.json        # Project metadata and dependencies
├── tsconfig.json       # TypeScript compiler options
└── bun.lockb           # Bun lockfile
```
