import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("WebSocket server with MongoDB is running!");
});

export default router;
