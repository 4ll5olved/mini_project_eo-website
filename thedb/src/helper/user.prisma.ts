import { prisma } from "../config"

export const getUserbyEmail = (email: string) => {
    prisma.user.findUnique({
        select: {
            id: true,
            name: true,
            password: true,
        },
            where: {
                email,
            }
    })
}