import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { jwt_secret } from "../config";
import { ErrorHandler } from "../helper/response.handler";
import { ToLogin } from "../interface/user.interface";

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;
        const token = String(authorization|| "").split("Bearer ")[1];
        const verifiedUser = verify(token, jwt_secret);
        if (!verifiedUser) throw new ErrorHandler("Unauthorized");
        req.user = verifiedUser as ToLogin;
    } catch (error) {
        next(error);
    }
}