import { Prisma, EventStatus} from "@prisma/client";
import { Request } from "express";
import { prisma } from "../config";
import { pagination } from "../helper/pagination";

class EventTypeService {
    async create(req: Request) {
        const { type, price, quantity } = req.body;
        const data: Prisma.EventTypeCreateInput = {
            type,
            price,
            quantity,
            event:{
                connect: {
                    id:req.body.eventId
                }
            }
        };

        await  prisma.eventType.create({ data });
    }

    async update(req: Request) {
        const id = Number(req.params.id);
        const { type, price, quantity } = req.body;
        const data: Prisma.EventTypeUpdateInput = {};
        if (type) data.type = type;
        if (price) data.price = price;
        if (quantity) data.quantity = quantity; 

        await prisma.eventType.update({ data, where: { id } });
    }
    
    async delete(req: Request) {
        const id = Number(req.params.id);
        await prisma.eventType.delete({
            where: {
                id,
            },
        });
    }

    async getById(req: Request) {
        const id = Number(req.params.id);
        return await prisma.eventType.findUnique({ where: { id } });
    }

    async getAll(req: Request) {
        const { page, title } = req.query
        return await prisma.eventType.findMany({
            where:{
                type: {
                    contains: String(title || ""),
                }
            },
            ...pagination(Number(page))
        })
    }

}

export default new EventTypeService();