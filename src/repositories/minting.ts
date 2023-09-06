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


export const getMetaData = async (contractAddress: TeamType, tokenId: number): Promise<MetaDataType> => {

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

    const attributes = tokenData.attributes.map(attr => ({
        key: attr.key,
        value: attr.value
    }));

    return {
        "name": "버미와수리",
        "description": "버미와수리 입니다.",
        "image": "image.chosun.com/sitedata/image/202103/09/2021030901912_2",
        "animation_url": new URL("https://image.chosun.com/sitedata/image/202103/09/2021030901912_2.png"),
        "background_color": "white",
        "sendable": false,
        "group_name": "서울시립대",
        "group_icon": new URL("https://image.chosun.com/sitedata/image/202103/09/2021030901912_2.png"),
        "hashtags": "#버미와수리",
        "layout": "general",
        "external_link": new URL("https://www.bummysuri.com"),
        "attributes": attributes
    };
};


export const getAvailableTokenId = async (team: TeamType): Promise<number> => {
  
    const availableToken = await prisma.token.findFirst({
      where: {
        contractAddr: team,
        owned: false,
      },
    });
  
    if (!availableToken) {
      throw new Error("No available token found");
    }
  
    return availableToken.id;
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
  
  
