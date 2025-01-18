import { WebSocketServer, WebSocket } from "ws";
import { Message } from "../models/message.model";
import { fetchBotResponse } from "../services/api.service";

export function initializeWebSocketServer(server: any): void {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws: WebSocket, req) => {
    const urlParams = new URLSearchParams(req.url?.split("?")[1]);
    const userId = urlParams.get("userId"); // Extract userId from URL query

    // Reject connection if userId is not provided
    if (!userId) {
      console.log("Connection rejected: userId is required.");
      ws.close(1008, "userId is required"); // Close with status code 1008 (Policy Violation)
      return;
    }

    console.log(`New client connected with userId: ${userId}`);

    // Fetch previous conversations from MongoDB for the user
    Message.find({ userId })
      .then((messages) => {
        // Send all previous conversations to the user
        const previousMessages = messages.map((message) => ({
          user: message.user,
          bot: message.bot,
        }));
        ws.send(
          JSON.stringify({
            type: "previousMessages",
            messages: previousMessages,
          })
        );
      })
      .catch((err) => console.error("Error fetching messages:", err));

    ws.on("message", async (message: string) => {
      console.log(`Received message: ${message}`);

      if (userId) {
        const botResponse = await fetchBotResponse(message);

        // Store the message in MongoDB with userId
        const newMessage = new Message({
          userId, // Store the userId
          user: message,
          bot: botResponse,
        });
        await newMessage.save();

        // Send response to the client
        ws.send(
          JSON.stringify({
            type: "newMessage",
            message: botResponse,
          })
        );
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });

    // ws.send("Welcome to the WebSocket server! Send a message to analyze.");
  });
}
