import e, { NextFunction, Request, Response } from "express";
import { ErrorHandler, responseHandler } from "../helper/response.handler";
import eventTypeService from "../service/eventType.service";

class EventTypeController {
    async CreateTicket (req: Request, res: Response, next: NextFunction) {
        try {
            await eventTypeService.create(req);
            responseHandler(res, "new ticket created", undefined, 201);
        } catch (error) {
            next(error);
        }
    }
    async UpdateTicket(req: Request, res: Response, next: NextFunction) {
        try {
            await eventTypeService.update(req);
            responseHandler(res, "type updated");
        } catch (error) {
            next(error);
        }
    }
    async DeleteTicket(req: Request, res: Response, next: NextFunction) {
        try {
            await eventTypeService.delete(req);
            responseHandler(res, "ticket deleted");
        } catch (error) {
            next(error);
        }
    }
    async GetAllTicket(req: Request, res: Response, next: NextFunction) {
        try {
            const events = await eventTypeService.getAll(req);
            responseHandler(res, "tickets found", events);
        } catch (error) {
            next(error);
        }
    }
    async GetTicketById(req: Request, res: Response, next: NextFunction) {
        try {
            const event = await eventTypeService.getById(req);
            if(!event) throw new ErrorHandler("ticket not found", 404); 
            responseHandler(res, "ticket found", event);
        } catch (error) {
            next(error);
        }
    }
}

export default new EventTypeController();