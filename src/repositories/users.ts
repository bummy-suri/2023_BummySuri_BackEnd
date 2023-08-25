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
            phone: user.phone,
            studentId: user.studentId,
            NFT_image: user.NFT_image,
            totalPoint: user.totalPoint
        },
    }).then((result) => {
        return result.id;
    }).catch((e) => {
        throw new PrismaError(e?.message);
    })
}

export const getUser = async (user: UserType): Promise<UserType | null> => {
    return prisma.user.findUnique({
        where: {
            id: user.id
        }
    }).then((result) => {
        return result ? result : null;
    }).catch((e) => {
        throw new PrismaError(e?.message);
    })
}

export const deleteUser = async (user: UserType): Promise<number> => {
    return prisma.user.delete({
        where: {
            id: user.id
        }
    }).then((result) => {
        return result.id;
    }).catch((e) => {
        throw new PrismaError(e?.message);
    })
}