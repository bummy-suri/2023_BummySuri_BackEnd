import { PrismaClient } from "@prisma/client";
import { PrismaError } from "../utils/errors";
import { NFTCountType, TeamType, MetaDataType } from "../models/sample";

const prisma = new PrismaClient();

export const getNFTCount = async (team: TeamType): Promise<NFTCountType | undefined> => {
    return prisma.nFTCount.findFirst({
        where: {
            team: team
        }
    }).then((result) => {
        if (result) {
            return result;
        } else {
            return prisma.nFTCount.create({
                data: {
                    team: team,
                    count: 0
                }
            }).then((result) => {
                return result;
            }).catch((e) => {
                throw new PrismaError(e.message);
            });
        }
    }).catch((e) => {
        throw new PrismaError(e.message);
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
        throw new PrismaError(e.message);
    });
};

export const getMetaData = async (contractAddress: string, tokenId: number) => {
    const tokenData = await prisma.token.findFirst({
        where: {
            id: tokenId,
            contractAddr: contractAddress
        },
        include: {
            attributes: true
        }
    });

    if (!tokenData) {
        throw new Error(`No matching token found for contract address`);
    }

    return tokenData;
};


export const getAvailableTokenId = async (contractAddr: string): Promise<number> => {
  
    const availableToken = await prisma.token.findFirst({
      where: {
        contractAddr: contractAddr,
        owned: false,
      },
    });
  
    if (availableToken === null) {
      throw new Error("No available token found");
    }
  
    return availableToken.id;
  }

  export const createIssuedRecord = async (userId: number, tokenId: number, contractAddr: string): Promise<void> => {

    const issuedResult = await prisma.issued.create({
      data: {
        ownerid: userId,
        tokenid: tokenId,
        contractAddr: contractAddr,
      },
    }).then((result) => {
        const updatedResult = prisma.token.update({
            where: {
              id: tokenId,
            },
            data: {
              owned: true,
            },
          }).catch((e) => {
            throw new PrismaError(e?.message);
          });
        return result;
    }).catch((e) => {
      throw new PrismaError(e?.message);
    });

  }
  
  
