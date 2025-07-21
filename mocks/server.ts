import { createMiddleware } from "@mswjs/http-middleware";
import cors from "cors";
import express from "express";
import { handlers } from "./handlers";

const app = express();
const port = 3100;

// Enable CORS for all requests
app.use(cors());

// Attach the Mock Service Worker middleware to the Express app
app.use(createMiddleware(...handlers));

// Start the Express server
app.listen(port, () => {
    console.log(`🚀 Mock server running at http://localhost:${port}`);
});
