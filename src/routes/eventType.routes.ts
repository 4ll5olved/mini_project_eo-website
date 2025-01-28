import { Router } from "express";
import eventTypeController from "../controller/eventType.controller";




export const eventTypeRoutes = () => {
    const router = Router();

    router.get("/", eventTypeController.GetAllTicket);
    router.get("/:id", eventTypeController.GetTicketById);
    router.post("/", eventTypeController.CreateTicket);
    router.delete("/:id", eventTypeController.DeleteTicket);
    router.patch("/:id", eventTypeController.UpdateTicket);

    return router;
}