import express, { Application } from "express";
import { PORT } from "./config";
import cors from "cors";
import { eventRoutes } from "./routes/event.routes";
import { eventTypeRoutes } from "./routes/eventType.routes";
import { orderRoutes } from "./routes/order.routes";
import { authorRoute } from "./routes/author.routes";
export class App {
    private app: Application
    constructor() {
        this.app = express()
        this.configure()
        this.routes()
    }

    private configure() {
        this.app.use(express.json())
        this.app.use(cors());
        
    }

    private routes() {
        this.app.use("/api/event", eventRoutes());
        this.app.use("/api/ticket", eventTypeRoutes());
        this.app.use("/api/order", orderRoutes());
        this.app.use("/api/login", authorRoute())  
    }

    start() {
        this.app.listen(PORT, () => {
            console.log("Server is running on port", PORT);
            
        })
    }
}