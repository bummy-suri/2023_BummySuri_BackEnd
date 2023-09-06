import { TeamType } from "@prisma/client";
import { MetaDataType, NFTCountType,  } from "../models/sample";
import { getUserPersistance, getNFTCountPersistance , updateNFTCountPersistance, updateUserPersistance, getMetaDataPersistance, getAvailableTokenIdPersistance, createIssuedRecordPersistance} from "../repositories";
import { generateToken } from "./auth";
import { acquireNFT } from "../apis/kas";

export const getNFTCountData = async (team: TeamType): Promise<NFTCountType> => {
    try {
        const NFTCountData = await getNFTCountPersistance(team);
        
        if (!NFTCountData) {
            throw new Error(`NFTCountData not found for team ${team}`);
        }
        
        return NFTCountData;
    } catch (e) {
        throw e;
    }
};



export const minting = async (userid: number ,team: TeamType): Promise<number | boolean> => {
    try {
        //check the count
        const countData = await getNFTCountPersistance(team);
        if (!countData) {
            throw new Error(`NFTCountData not found for team ${team}`);
        }else{
            if(countData.count >= 5000){
                throw new Error(`NFTCountData is over 5000 for team ${team}`);
            }

            let userData = await getUserPersistance(userid);
            if (!userData) {
                throw new Error(`userCardAddress not found for user ${userid}`);
            }

            const userCardAddress = userData.userCardAddress;

            //isMinted check
            if (userData.isMinted === true) {
                return false;
            }

            // //get AvailableTokenId
            // const userTokenId = await getAvailableTokenIdPersistance(team);
            // if (!userTokenId) {
            //     throw new Error(`AvailableTokenId not found`);
            // }

            // //minting
            // await acquireNFT({team, tokenId: userTokenId, cardAddress: userCardAddress});

            // //issuedRecord
            // await createIssuedRecordPersistance(userid, userTokenId, team);

            //update the user isMinted to true
            userData = await updateUserPersistance(userid, team, true);

            //update the NFTcount
            const updatedCountData= await updateNFTCountPersistance(team);

            
             //generate accessToken
            const token = parseInt(generateToken(userid, true));
            return token;
        }
        
    } catch (e) {
        throw e;
    }
}


export const getMetaData = async (contractAddress: TeamType, tokenId: number): Promise<MetaDataType> => {
    const tokenData = await getMetaData(contractAddress, tokenId);

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