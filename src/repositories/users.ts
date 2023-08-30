import { UserType, UserTypeIncludeID } from "../models/sample";
import { PrismaClient, User } from '@prisma/client';
import { PrismaError } from "../utils/errors";

const prisma = new PrismaClient();

export const createUser = async (user: UserType): Promise<UserTypeIncludeID> => {
    return prisma.user.create({
        data: {
            userCardAddress: user.userCardAddress,
            univ: user.univ,
            totalPoint: user.totalPoint,
            isMinted: user.isMinted
        },
    }).then((result) => {
        return result;
    }).catch((e) => {
        throw new PrismaError(e?.message);
    })
}

export const getUserByCardAddress = async (cardAddress: string): Promise<number | null> => {
    return prisma.user.findFirst({
        where: {
            userCardAddress: cardAddress
        }
    }).then((result) => {
        return result ? result.id : null;
    }).catch((e) => {
        throw new PrismaError(e?.message);
    })
}

export const getUser = async (userId: number): Promise<UserTypeIncludeID | null> => {
    try {
        const userData = {
          id: 1111,
          userCardAddress: "0x1234567890abcdef",
          name: "John Doe",
          univ: "KOREA" as const,
          NFT_image: "https://example.com/path/to/image.png",
          totalPoint: 411
        };
    
        const result = await prisma.user.create({
          data: userData
        });
    
      } catch (error) {
        console.error("Error saving user:", error);
        throw error;
      }

    return prisma.user.findFirst({
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
