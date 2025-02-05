import { Router } from "express";
import orderControl from "../controller/order.control";


export const orderRoutes = () => {
    const router = Router();
    router.get("/", orderControl.GetAllOrder);
    router.get("/:id", orderControl.GetOrderById);
    router.post("/", orderControl.CreateOrder);
    router.delete("/:id", orderControl.DeleteOrder);
    router.patch("/:id", orderControl.UpdateTicket);
    return router;
};