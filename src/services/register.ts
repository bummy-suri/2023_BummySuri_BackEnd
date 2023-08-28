import { handleApp2AppResultStateAPIs } from "../apis";
import { TokenType, UserType } from "../models/sample";
import { createUser, getUser, deleteUser } from "../repositories/users";
import { generateToken } from "./auth";


export const mintUser = async (user: UserType) : Promise<TokenType> => {

    let token: string = ''
    let userid: string = ''

    try {
        // TODO: a minting api call

        userid = (await createUser(user)).toString()
        token = generateToken(userid)

    } catch (e) {

    }

    return {
        access: token,
    }
}

export const grantUser = async (requestKey: string) : Promise<TokenType> => {

    try {
        const address = await handleApp2AppResultStateAPIs(requestKey)

        // regard user exists at userid = 1
        const userid = 1

        const token = generateToken(userid.toString())

        return {
            access: token,
        }

    } catch (e) {
        throw e;
    }
}

export const getUserData = async (user: UserType): Promise<UserType> => {
    
    try {
        const userData = await getUser(user);
        
        if (!userData) {
            throw new Error("User not found");
        }
        
        return userData;

    } catch (e) {
        throw e;
    }
}

export const deleteUserData = async (user: UserType): Promise<string> => {
    let deletedUserId: string;

    try {
        deletedUserId = (await deleteUser(user)).toString();
    } catch (e) {
        throw e;
    }

    return deletedUserId;
}
