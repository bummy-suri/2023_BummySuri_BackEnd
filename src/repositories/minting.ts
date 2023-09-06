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
            prisma.nFTCount.create({
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

export const getMetaData = async (contractAddress: TeamType, tokenId: number) => {
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


export const getAvailableTokenId = async (team: TeamType): Promise<number> => {
  
    // const availableToken = await prisma.token.findFirst({
    //   where: {
    //     contractAddr: team,
    //     owned: false,
    //   },
    // });


  
    // if (!availableToken) {
    //   throw new Error("No available token found");
    // }
  
    // return availableToken.id;
    return 0;
  }

  export const createIssuedRecord = async (userId: number, tokenId: number, team: TeamType): Promise<void> => {

    await prisma.issued.create({
      data: {
        ownerid: userId,
        tokenid: tokenId,
        contractAddr: team,
      },
    }).catch((e) => {
      throw new PrismaError(e?.message);
    });
  
    await prisma.token.update({
      where: {
        id: tokenId,
      },
      data: {
        owned: true,
      },
    }).catch((e) => {
      throw new PrismaError(e?.message);
    });
  }
  
  
