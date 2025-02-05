import { Router } from "express";
import EventController from "../controller/event.control";



export const eventRoutes = () => {
    const router = Router();

    router.get("/", EventController.getAllEvent);
    router.get("/:id", EventController.getEventById);
    router.post("/", EventController.createEvent);
    router.delete("/:id", EventController.deleteEvent);
    router.patch("/:id", EventController.updateEvent);

    return router;
}