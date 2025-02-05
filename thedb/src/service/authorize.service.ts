import { Request } from "express";
import { getUserbyEmail } from "../helper/user.prisma";
import { ToLogin } from "../interface/user.interface";
import { ErrorHandler } from "../helper/response.handler";
import { jwt_secret, prisma } from "../config";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { hashedPass } from "../helper/bcrypt";
import { Prisma } from "@prisma/client";


class Authorize{
    async signIn(req: Request) {
        const { email, password } = req.body;

        const user = (await getUserbyEmail(email)) as unknown as ToLogin;
        if (!user) throw new ErrorHandler("User Not Found");
        else if (!(await compare(password, user.password as string)))
            throw new ErrorHandler("Invalid Password");

        delete user.password;
        const token = sign(user, jwt_secret, {
            expiresIn: "20m"
        });

        return {
            token
        };
    }
    async signUp(req: Request) {
        const { email, name, password } = req.body;
        await prisma.user.create({
            data: {
                email,
                password: await hashedPass(password),
                name,
            },
        });
    }
    
    async updateUser(req: Request) {
        const { email, name, password } = req.body;
        const id = Number(req.params.id);
        const data: Prisma.UserUpdateInput = {};
        if (email) data.email = email;
        if (name) data.name = name;
        if (password) data.password = await hashedPass(password);

        await prisma.user.update({
            data,
            where: {
                id,
            },
        });
        return await prisma.user.findUnique({
            select: {
                id: true,
                email: true,
                name: true,
                role: true
            },
            where: {
                id
            },
        });
    }
}

export default new Authorize();