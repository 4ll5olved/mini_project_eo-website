import e, { NextFunction, Request, Response } from "express";
import { ErrorHandler, responseHandler } from "../helper/response.handler";
import orderService from "../service/order.service";


class OrderController {
    async CreateOrder (req: Request, res: Response, next: NextFunction) {
        try {
            await orderService.create(req);
            responseHandler(res, "new order created", undefined, 201);
        } catch (error) {
            next(error);
        }
    }
    async UpdateTicket(req: Request, res: Response, next: NextFunction) {
        try {
            await orderService.update(req);
            responseHandler(res, "order updated");
        } catch (error) {
            next(error);
        }
    }
    async DeleteOrder(req: Request, res: Response, next: NextFunction) {
        try {
            await orderService.delete(req);
            responseHandler(res, "order deleted");
        } catch (error) {
            next(error);
        }
    }
    async GetAllOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const events = await orderService.getAll(req);
            responseHandler(res, "orders found", events);
        } catch (error) {
            next(error);
        }
    }
    async GetOrderById(req: Request, res: Response, next: NextFunction) {
        try {
            const event = await orderService.getById(req);
            if(!event) throw new ErrorHandler("order not found", 404); 
            responseHandler(res, "order found", event);
        } catch (error) {
            next(error);
        }
    }
}

export default new OrderController();