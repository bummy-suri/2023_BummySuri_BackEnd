import { TeamType } from "@prisma/client";
import { NFTCountType } from "../models/sample";
import { getNFTCount , updateNFTCount} from "../repositories/mint";

export const getNFTCountData = async (team: TeamType): Promise<NFTCountType> => {
    try {
        const NFTCountData = await getNFTCount(team);
        
        if (!NFTCountData) {
            throw new Error(`NFTCountData not found for team ${team}`);
        }
        
        return NFTCountData;
    } catch (e) {
        throw e;
    }
};

export const minting = async (team: TeamType): Promise<number> => {
    try {
        const countData = await getNFTCount(team);
        if (!countData) {
            throw new Error(`NFTCountData not found for team ${team}`);
        }else{
            if(countData.count >= 5000){
                throw new Error(`NFTCountData is over 5000 for team ${team}`);
            }
            const updatedCountData= await updateNFTCount(team);
            return updatedCountData;
        }
        
    } catch (e) {
        throw e;
    }
}