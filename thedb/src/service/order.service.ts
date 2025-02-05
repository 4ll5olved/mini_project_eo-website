import { Prisma, EventStatus} from "@prisma/client";
import { Request } from "express";
import { prisma } from "../config";
import { pagination } from "../helper/pagination";

class OrderService {
    async create(req: Request) {
        const { total, status, userId } = req.body;
        const data: Prisma.OrderCreateInput = {
            total,
            status,
            user: {
              connect: {
                id: userId,
              },
            },
          };

        await  prisma.order.create({ data });
    }

    async update(req: Request) {
        const id = Number(req.params.id);
        const { total, status } = req.body;
        const data: Prisma.OrderUpdateInput = {};
        if (total) data.total = total;
        if (status) data.status = status as EventStatus;//enum status
        await prisma.order.update({ data, where: { id } });
    }
    
    async delete(req: Request) {
        const id = Number(req.params.id);
        await prisma.order.delete({
            where: {
                id,
            },
        });
    }

    async getById(req: Request) {
        const id = Number(req.params.id);
        return await prisma.order.findUnique({ where: { id } });
    }

    async getAll(req: Request) {
        const { page, id } = req.query
        return await prisma.order.findMany({
            where:{
                id: {
                    equals: Number(id),
                }
            },
            ...pagination(Number(page))
        })
    }

}

export default new OrderService();