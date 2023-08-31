import { NFTCountType } from "../models/sample";
import { getNFTCount } from "../repositories/mint";

export const getNFTCountData = async (): Promise<NFTCountType> => {
    
    try {
        const NFTCountData = await getNFTCount();
        
        if (!NFTCountData) {
            throw new Error("NFTCountData not found");
        }
        
        return NFTCountData;

    } catch (e) {
        throw e;
    }
}