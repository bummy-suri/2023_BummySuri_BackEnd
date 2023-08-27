import { UserType } from "../models/sample";
import { PrismaClient } from '@prisma/client';
import { PrismaError } from "../utils/errors";

const prisma = new PrismaClient();

export const createUser = async (user: UserType): Promise<number> => {
    return prisma.user.create({
        data: {
            userCardAddress: user.userCardAddress,
            name: user.name,
            univ: user.univ,
            NFT_image: user.NFT_image,
            totalPoint: user.totalPoint
        },
    }).then((result) => {
        return result.id;
    }).catch((e) => {
        throw new PrismaError(e?.message);
    })
}

export const getUser = async (userId: number): Promise<UserType | null> => {
    return prisma.user.findUnique({
        where: {
            id: userId
        }
    }).then((result) => {
        return result ? result : null;
    }).catch((e) => {
        throw new PrismaError(e?.message);
    })
}

export const deleteUser = async (userId: number): Promise<string> => {
    return prisma.user.delete({
        where: {
            id: userId
        }
    }).then((result) => {
        return "User successfully deleted.";
    }).catch((e) => {
        throw new PrismaError(e?.message);
    })
}