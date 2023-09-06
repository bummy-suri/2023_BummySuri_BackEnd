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

            //isMinted check
            const userCardAddress = userData.userCardAddress;
            if (userData.isMinted === true) {
                throw new Error(`Already minted`);
            }

            //get AvailableTokenId
            const userTokenId = await getAvailableTokenIdPersistance(team);
            if (!userTokenId) {
                throw new Error(`AvailableTokenId not found`);
            }

            //minting
            await acquireNFT({team, tokenId: userTokenId, cardAddress: userCardAddress});

            //issuedRecord
            await createIssuedRecordPersistance(userid, userTokenId, team);

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


export const getMetaData = async (contractAddr: TeamType, userId: number): Promise<MetaDataType> => {
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
