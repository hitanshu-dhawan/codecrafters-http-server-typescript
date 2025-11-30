import * as net from "net";
import * as fs from "fs";
import * as path from "path";
import { parseArgs } from "util";

// Parse command line arguments
const { values: flags } = parseArgs({
    args: process.argv.slice(2),
    options: {
        directory: {
            type: "string",
        },
    },
});

// Get the directory from flags
const directory = flags.directory;

// Create the TCP server
const server = net.createServer((socket) => {

    socket.on("data", (data) => {

        // Convert data to string to parse the request
        const request = data.toString();
        console.log("Received request:", request);

        // Extract the URL path from the request line
        const urlPath = request.split("\r\n")[0].split(" ")[1];
        console.log("Path:", urlPath);

        // Handle root path
        if (urlPath === "/") {
            socket.write("HTTP/1.1 200 OK\r\n\r\n");
        }
        // Handle /echo/{str} endpoint
        else if (urlPath.startsWith("/echo/")) {
            const str = urlPath.slice(6);
            socket.write(`HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${str.length}\r\n\r\n${str}`);
        }
        // Handle /user-agent endpoint
        else if (urlPath === "/user-agent") {
            const lines = request.split("\r\n");
            const userAgentLine = lines.find(line => line.toLowerCase().startsWith("user-agent:"));
            const userAgent = userAgentLine ? userAgentLine.substring(userAgentLine.indexOf(":") + 1).trim() : "";
            socket.write(`HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${userAgent.length}\r\n\r\n${userAgent}`);
        }
        // Handle /files/{filename} endpoint
        else if (urlPath.startsWith("/files/") && directory) {
            const filename = urlPath.slice(7);
            const filePath = path.join(directory, filename);

            if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath);
                socket.write(`HTTP/1.1 200 OK\r\nContent-Type: application/octet-stream\r\nContent-Length: ${content.length}\r\n\r\n`);
                socket.write(content);
            } else {
                socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
            }
        }
        // Handle 404 Not Found
        else {
            socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
        }

        socket.end();
    });

    socket.on("close", () => {
        socket.end();
    });

});

// Listen on port 4221
server.listen(4221, "localhost");
