import { createServer } from "http";
import { app } from "./app";
import { initializeWebSocketServer } from "./websocket/websocket.server";
import dotenv from "dotenv";
dotenv.config();

const PORT = 3000;

// Create HTTP server
const server = createServer(app);

// Initialize WebSocket Server
initializeWebSocketServer(server);

// Start Server
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
