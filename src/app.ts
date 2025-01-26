import express, { Application } from "express";
import { PORT } from "./config";
import cors from "cors";
import { eventRoutes } from "./routes/event.routes";
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
    }

    start() {
        this.app.listen(PORT, () => {
            console.log("Server is running on port", PORT);
            
        })
    }
}