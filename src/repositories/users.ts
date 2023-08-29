import { UserType } from "../models/sample";
import { PrismaClient } from '@prisma/client';
import { PrismaError } from "../utils/errors";

const prisma = new PrismaClient();

export const createUser = async (user: UserType): Promise<number> => {
    return prisma.user.create({
        data: {
            id: user.id,
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

export const getUserByCardAddress = async (cardAddress: string): Promise<UserType | null> => {
    return prisma.user.findFirst({
        where: {
            userCardAddress: cardAddress
        }
    }).then((result) => {
        return result ? result : null;
    }).catch((e) => {
        throw new PrismaError(e?.message);
    })
}

export const getUser = async (userId: number): Promise<UserType | null> => {
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