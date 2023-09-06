import { PrismaClient } from "@prisma/client";
import { PrismaError } from "../utils/errors";
import { NFTCountType, TeamType, MetaDataType, NFTMetaData } from "../models/sample";

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

export const saveNFTData = async (NFTData: NFTMetaData): Promise<NFTMetaData> =>{
    try {
        const createdData = await prisma.nftMetadata.create({
          data: {
            ...NFTData
          },
        });
        return createdData;
    } catch(error: any) {
        throw new PrismaError(error.message);
    }
};

export const getMetaData = async (contractAddress: string, tokenId: string): Promise<MetaDataType> => {
    return prisma.nftMetadata.findUnique({
        where: {
            contractAddr_tokenId: {
                contractAddr: contractAddress,
                tokenId: tokenId
            }
        }
    }).then((result) => {
        if (result) {
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
                "external_link": new URL("https://www.bummysuri.com")
            }
            
        } else {
            throw new Error(`No matching metadata found for contract address ${contractAddress} and tokenId ${tokenId}`);
        }
    }).catch((e) => {
        throw new PrismaError(e.message);
    });
};