import { TeamType } from "@prisma/client";
import { MetaDataType, NFTCountType, NFTMetaData, } from "../models/sample";
import { getUserPersistance, getNFTCountPersistance , updateNFTCountPersistance, updateUserPersistance, getMetaDataPersistance, saveNFTDataPersistance} from "../repositories";
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

export const minting = async (userid: number ,team: TeamType): Promise<number> => {
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
            const userTokenId = 2937

            //minting
            await acquireNFT({team, tokenId: userTokenId, cardAddress: userCardAddress});

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

export const saveNFTData = async (NFTData: NFTMetaData): Promise<NFTMetaData> => {
    try{
        const NFTMetaData = await saveNFTDataPersistance(NFTData);
        if (!NFTMetaData) {
            throw new Error(`NFTMetaData not found`);
        }
        
        return NFTMetaData;
    } catch(e) {
        throw e;
    }
}

export const getMetaData = async (contractAddr: string, userId: string): Promise<MetaDataType> => {
    try {
        const metaData = await getMetaDataPersistance(contractAddr, userId);
        
        if (!metaData) {
            throw new Error(`MetaData not found`);
        }
        
        return metaData;
    } catch (e) {
        throw e;
    }
}
