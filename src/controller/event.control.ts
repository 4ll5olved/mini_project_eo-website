import { NextFunction, Request, Response } from "express";
import eventService from "../service/event.service";
import { responseHandler } from "../helper/response.handler";

class EventController {
    async createEvent(req: Request, res: Response, next: NextFunction) {
        try {
            await eventService.create(req);
            responseHandler(res, "new event created", undefined, 201);
        } catch (error) {
            next(error);
        }
    }
    async updateEvent(req: Request, res: Response, next: NextFunction) {
        try {
            await eventService.update(req);
            responseHandler(res, "event updated");
        } catch (error) {
            next(error);
        }
    }
    async deleteEvent(req: Request, res: Response, next: NextFunction) {
        try {
            await eventService.delete(req);
            responseHandler(res, "event deleted");
        } catch (error) {
            next(error);
        }
    }
    async getAllEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const events = await eventService.getAll(req);
            responseHandler(res, "events found", events);
        } catch (error) {
            next(error);
        }
    }
    async getEventById(req: Request, res: Response, next: NextFunction) {
        try {
            const event = await eventService.getById(req);
            responseHandler(res, "event found", event);
        } catch (error) {
            next(error);
        }
    }
}

export default new EventController();