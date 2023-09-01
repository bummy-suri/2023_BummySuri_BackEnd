import { handleApp2AppResultStateAPIs } from "../apis";
import { TeamType, TokenType, UserTypeIncludeID } from "../models/sample";
import { createUser, getUserByCardAddress, getUser, deleteUser } from "../repositories/users";
import { generateToken } from "./auth";


export const mintUser = async (userid: number, univ: TeamType): Promise<TokenType> => {
    let token: string = ''

    try {
        /* 
        1. get card address by userid
        2. check if user already minted
        3. mint card calling klaytn api
        4. check user.univ at user and increase NFTcount of user.univ at NFTCount
        5. save isMinted = true at user table
        6. renew token
        */

    } catch (e) {
        throw e;
    }

    return {
        access: token,
    }
}



export const grantUser = async (requestKey: string) : Promise<TokenType> => {
    try {
        const address = await handleApp2AppResultStateAPIs(requestKey);
        
        let {userid, exists} = await getUserByCardAddress(address);

        if (!exists) {
            userid = await createUser({userCardAddress: address, totalPoint: 2000, isMinted: false });
        }

        let user = await getUser(userid);
        const token = generateToken(userid, user.isMinted);

        return {
            access: token
        };

    } catch (e) {
        throw e;
    }
}




export const getUserData = async (userId: number): Promise<UserTypeIncludeID> => {
    
    try {
        const userData = await getUser(userId);
        
        if (!userData) {
            throw new Error("User not found");
        }
        
        return {...userData, id: userId};

    } catch (e) {
        throw e;
    }
}

export const deleteUserData = async (userId: number): Promise<string> => {
    let deletedUser: string;

    try {
        deletedUser = (await deleteUser(userId)).toString();
        return deletedUser;
    } catch (e) {
        throw e;
    }
}
