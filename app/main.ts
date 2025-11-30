import * as net from "net";

const server = net.createServer((socket) => {

    socket.on("data", (data) => {

        const request = data.toString();
        console.log("Received request:", request);

        const path = request.split("\r\n")[0].split(" ")[1];
        console.log("Path:", path);

        if (path === "/") {
            socket.write("HTTP/1.1 200 OK\r\n\r\n");
        } else {
            socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
        }

        socket.end();
    });

    socket.on("close", () => {
        socket.end();
    });

});

server.listen(4221, "localhost");
