import { UserType } from "../models/sample";
import { PrismaClient } from '@prisma/client';
import { PrismaError } from "../utils/errors";

const prisma = new PrismaClient();



export const createUser = async (user: UserType) : Promise<Number> => {

    return prisma.user.create({
        data: {
            klaytn_address: user.userCardAddress,
            totalPoint: 1000,
        },
    }).then((result) => {
        return result.id
    }).catch((e) => {
        throw new PrismaError(e?.message)
    })
}