import { TeamType } from "@prisma/client";
import { MetaDataType, NFTCountType, } from "../models/sample";
import { getNFTCountPersistance , updateNFTCountPersistance, updateUserPersistance, getMetaDataPersistance} from "../repositories";
import { generateToken } from "./auth";

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

            //minting


            //  if success, update the user
            const userData = await updateUserPersistance(userid, team, true);

                //update the count
            const updatedCountData= await updateNFTCountPersistance(team);
                        //generate accessToken
            const token = parseInt(generateToken(userid, true));
            return token;
        }
        
    } catch (e) {
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
