import { TeamType } from "@prisma/client";
import { NFTCountType } from "../models/sample";
import { getNFTCount , updateNFTCount} from "../repositories/minting";
import { updateUser} from "../repositories/users";
import { generateToken } from "./auth";

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

export const minting = async (userid: number ,team: TeamType): Promise<number> => {
    try {
        //check the count
        const countData = await getNFTCount(team);
        if (!countData) {
            throw new Error(`NFTCountData not found for team ${team}`);
        }else{
            if(countData.count >= 5000){
                throw new Error(`NFTCountData is over 5000 for team ${team}`);
            }

            //minting


            //  if success, update the user
            const userData = await updateUser(userid, team, true);

                //update the count
            const updatedCountData= await updateNFTCount(team);
                        //generate accessToken
            const token = parseInt(generateToken(userid, true));
            return token;
        }
        
    } catch (e) {
        throw e;
    }
}