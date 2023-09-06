import { TeamType } from "@prisma/client";
import { MetaDataType, NFTCountType,  } from "../models/sample";
import { getUserPersistance, getNFTCountPersistance , updateNFTCountPersistance, updateUserPersistance, getMetaDataPersistance, getAvailableTokenIdPersistance, createIssuedRecordPersistance} from "../repositories";
import { generateToken } from "./auth";
import { acquireNFT } from "../apis/kas";
import { BUMMY_CONTRACT, SURI_CONTRACT } from "../apis/init";

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
        let contractAddr = BUMMY_CONTRACT;

        if (team === "KOREA"){
            contractAddr = BUMMY_CONTRACT;
        }else if(team === "YONSEI"){
            contractAddr = SURI_CONTRACT; 
        }

        if (!contractAddr) {
            throw new Error(`contractAddr not found for team ${team}`);
        }
        
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

            //get AvailableTokenId
            const userTokenId = await getAvailableTokenIdPersistance(contractAddr);
            if (!userTokenId) {
                throw new Error(`AvailableTokenId not found`);
            }

            //minting
            await acquireNFT({team, tokenId: userTokenId, cardAddress: userCardAddress});

            //issuedRecord
            await createIssuedRecordPersistance(userid, userTokenId, contractAddr);

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


export const getMetaData = async (contractAddress: string, tokenId: number): Promise<MetaDataType> => {
    const tokenData = await getMetaDataPersistance(contractAddress, tokenId);

    const attributes = tokenData.attributes.map(attr => ({
        key: attr.key,
        value: attr.value
    }));

    let group_name = "";
    let group_icon = "";

    if (contractAddress === BUMMY_CONTRACT){
        group_name = "버미";
        group_icon = "https://static.bummysuri.com/asset/bummy_badge.png";
    }else if(contractAddress === SURI_CONTRACT){
        group_name = "수리";
        group_icon = "https://static.bummysuri.com/asset/suri_badge.png";
    }

    return {
        "image": "https://static.bummysuri.com/asset/"+contractAddress+"/"+tokenData.image,
        "group_name": group_name,
        "group_icon": group_icon,
        "attributes": attributes
    };
};