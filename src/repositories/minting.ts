import { PrismaClient } from "@prisma/client";
import { PrismaError } from "../utils/errors";
import { NFTCountType, TeamType } from "../models/sample";

const prisma = new PrismaClient();

export const getNFTCount = async (team: TeamType): Promise<NFTCountType> => {
    return prisma.nFTCount.findFirst({
        where: {
            team: team
        }
    }).then((result) => {
        if (result) {
            return result;
        } else {
            throw new Error(`No matching NFT count found for team ${team}`);
        }
    }).catch((e) => {
        throw new Error(e.message);
    });
};

export const updateNFTCount = async (team: TeamType): Promise<number> => {
    return prisma.nFTCount.update({
        where: {
            team: team
        },
        data: {
            count: {
                increment: 1
            }
        }
    }).then((result) => {
        return result.count;
    }).catch((e) => {
        throw new Error(e.message);
    });
}