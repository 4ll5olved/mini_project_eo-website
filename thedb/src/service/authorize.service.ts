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
        const { email, name, password, referrerId} = req.body;
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (existingUser) throw new ErrorHandler("User Already Exists");
        const newUser = await prisma.user.create({
            data: {
                email,
                password: await hashedPass(password),
                name,
                referrerId: referrerId ? Number(referrerId) : null
            },
        });

        if (referrerId) {
            await prisma.user.update({
                where: { id: Number(referrerId) },
                data: {
                    points: { increment: 10 } // Reward 10 points to the referrer
                }
            });
        }

        return { message: "User registered successfully", userId: newUser.id };
    }
    
    async updateUser(req: Request) {
        const { email, name, password, referrerId } = req.body;
        const id = Number(req.params.id);
        const data: Prisma.UserUpdateInput = {};
        if (email) data.email = email;
        if (name) data.name = name;
        if (password) data.password = await hashedPass(password);
        if (referrerId !== undefined) data.referrer = {
            connect: {
                id: Number(referrerId)
            }
        };
    
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
                role: true,
                referrerId: true
            },
            where: {
                id
            },
        });
    }
}

export default new Authorize();