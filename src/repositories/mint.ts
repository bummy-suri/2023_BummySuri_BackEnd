import { PrismaClient } from "@prisma/client";
import { PrismaError } from "../utils/errors";
import { NFTCountType } from "../models/sample";

const prisma = new PrismaClient();

export const getNFTCount= async (): Promise<NFTCountType | null> => {

    return prisma.nFTCount.findFirst({
    }).then((result) => {
        return result ? result : null;
    }).catch((e) => {
        throw new PrismaError(e?.message);
    })
}