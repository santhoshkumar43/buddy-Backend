import { WebSocketServer, WebSocket } from "ws";
import { Message } from "../models/message.model";
import { fetchBotResponse } from "../services/api.service";

export function initializeWebSocketServer(server: any): void {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws: WebSocket) => {
    console.log("New client connected!");

    ws.on("message", async (message: string) => {
      console.log(`Received message: ${message}`);

      const botResponse = await fetchBotResponse(message);

      // Store in MongoDB
      const newMessage = new Message({
        user: `${message}`,
        bot: `${botResponse}`,
      });
      await newMessage.save();

      // Send response to client
      ws.send(botResponse);
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });

    ws.send("Welcome to the WebSocket server! Send a message to analyze.");
  });
}
