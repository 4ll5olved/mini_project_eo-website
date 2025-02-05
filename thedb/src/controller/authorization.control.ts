import { NextFunction, Request, Response } from "express";
import authorizeService from "../service/authorize.service";
import { responseHandler } from "../helper/response.handler";

class AuthorControl {
    async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await authorizeService.signIn(req);
            responseHandler(res, "login success", data);
        } catch (error) {
            next(error)
        }
    }

    async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            await authorizeService.signUp(req);
            responseHandler(res, "register success");
        } catch (error) {
            next(error)
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await authorizeService.updateUser(req);
            responseHandler(res, "register success", data);
        } catch (error) {
            next(error)
        }
    }
}

export default new AuthorControl