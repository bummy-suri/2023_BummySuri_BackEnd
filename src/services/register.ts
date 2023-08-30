import { handleApp2AppResultStateAPIs } from "../apis";
import { TeamType, TokenType, UserType } from "../models/sample";
import { createUser, getUserByCardAddress, getUser, deleteUser } from "../repositories/users";
import { generateToken } from "./auth";


export const mintUser = async (userid: number, univ: TeamType): Promise<TokenType> => {
    let token: string = ''

    try {
        /* 
        1. get card address by userid
        2. check if user already minted
        3. mint card calling klaytn api
        4. save isMinted = true at user table
        5. renew token
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
        const address = await handleApp2AppResultStateAPIs(requestKey)

        /*
        1. address 를 통해 사용자가 존재하는지 확인, 없으면 등록
        2. 민팅을 한 사용자인지를 확인
        3. token 을 발급
        */

        const userid = 1111

        const token = generateToken(userid, true)

        return {
            access: token,
        }

    } catch (e) {
        throw e;
    }
}

export const getUserData = async (userId: number): Promise<UserType> => {
    
    try {
        const userData = await getUser(userId);
        
        if (!userData) {
            throw new Error("User not found");
        }
        
        return userData;

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
