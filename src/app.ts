import express, { Application } from "express";
import { PORT } from "./config";
import cors from "cors";
export class App {
    private app: Application
    constructor() {
        this.app = express()
        this.configure()
    }

    private configure() {
        this.app.use(express.json())
        this.app.use(cors());

    }

    start() {
        this.app.listen(PORT, () => {
            console.log("Server is running on port", PORT);
            
        })
    }
}