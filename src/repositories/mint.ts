import { PrismaClient } from "@prisma/client";
import { PrismaError } from "../utils/errors";
import { NFTCountType } from "../models/sample";

const prisma = new PrismaClient();

export const getNFTCount = async (): Promise<NFTCountType> => {
    return prisma.nFTCount.findFirst({
    }).then((result) => {
        if (result) {
            return result;
        } else {
            throw new PrismaError("No matching NFT count found");
        }
    }).catch((e) => {
        throw new PrismaError(e?.message);
    })
}
