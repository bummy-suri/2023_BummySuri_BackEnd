import { UserType, UserTypeIncludeID } from "../models/sample";
import { PrismaClient, User } from '@prisma/client';
import { PrismaError } from "../utils/errors";

const prisma = new PrismaClient();

export const createUser = async (user: UserType): Promise<number> => {
    return prisma.user.create({
        data: {
            userCardAddress: user.userCardAddress,
            univ: user.univ,
            totalPoint: user.totalPoint,
            isMinted: user.isMinted
        },
    }).then((result) => {
        return result.id;
    }).catch((e) => {
        throw new PrismaError(e?.message);
    })
}

export const getUserByCardAddress = async (cardAddress: string): Promise<{userid: number, exists: boolean}> => {
    return prisma.user.findFirst({
        where: {
            userCardAddress: cardAddress
        }
    }).then((result) => {
        return result ? {userid: result.id, exists: true} : {userid: 0, exists: false};
    }).catch((e) => {
        throw new PrismaError(e?.message);
    })
}

export const getUser = async (userId: number): Promise<UserType> => {

    return prisma.user.findFirst({
        where: {
            id: userId
        }
    }).then((result) => {
        if (!result) {
            throw new Error("User not found");
        }
        return result
    }).catch((e) => {
        throw new PrismaError(e?.message);
    })
}

export const deleteUser = async (userId: number): Promise<string> => {
    try {
        // Delete relatedBettings
        await prisma.betting.deleteMany({
            where: {
                userId: userId
            }
        });

        // Delete relatedMiniGames
        await prisma.miniGame.deleteMany({
            where: {
                userId: userId
            }
        });

        // Delete User
        await prisma.user.delete({
            where: {
                id: userId
            }
        });
        
        return "User successfully deleted.";

    } catch (e: any) {
        throw new PrismaError(e?.message);
    }
}
