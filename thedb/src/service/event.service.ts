import { Prisma, EventStatus} from "@prisma/client";
import { Request } from "express";
import { prisma } from "../config";
import { pagination } from "../helper/pagination";

class EventService {
    async create(req: Request) {
        const { title, description, location, date, userId, status } = req.body;

         if (!Object.values(EventStatus).includes(status)) {
            throw new Error(`Invalid status value. Must be one of: ${Object.values(EventStatus).join(", ")}`);
        }
        const data: Prisma.EventCreateInput = {
            title,
            description,
            location,
            date,
            user: {
                connect: {
                    id: userId
                },
            },
            status: status as EventStatus,//enum status
        };

        await  prisma.event.create({ data });
    }

    async update(req: Request) {
        const id = Number(req.params.id);
        const { title, description, location, date, userId, status } = req.body;
        const data: Prisma.EventUpdateInput = {};
        if (title) data.title = title;
        if (description) data.description = description;
        if (location) data.location = location;
        if (date) data.date = date;
        if (status) data.status = status as EventStatus;//enum status

        await prisma.event.update({ data, where: { id } });
    }
    
    async delete(req: Request) {
        const id = Number(req.params.id);
        await prisma.event.delete({
            where: {
                id,
            },
        });
    }

    async getById(req: Request) {
        const id = Number(req.params.id);
        return await prisma.event.findUnique({ where: { id } });
    }

    async getAll(req: Request) {
        const { page, title } = req.query
        return await prisma.event.findMany({
            where:{
                title: {
                    contains: String(title || ""),
                }
            },
            ...pagination(Number(page))
        })
     }

}

export default new EventService();