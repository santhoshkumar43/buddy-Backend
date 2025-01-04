const express = require("express");
const http = require("http");
const WebSocket = require("ws")

const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Initialize WebSocket server instance
const wss = new WebSocket.Server({ server });

// WebSocket server logic
wss.on("connection", (ws) => {
  console.log("New client connected!");

  // Handle messages from the client
  ws.on("message", (message) => {
    console.log(`Received: ${message}`);

    // Echo the message back to the client
    ws.send(`Server received: ${message}`);
  });

  // Handle client disconnects
  ws.on("close", () => {
    console.log("Client disconnected");
  });

  // Send a welcome message to the client
  ws.send("Welcome to the WebSocket server!");
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
