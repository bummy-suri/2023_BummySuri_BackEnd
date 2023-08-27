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
    let deletedUserId: string;

    try {
        deletedUserId = (await deleteUser(userId)).toString();
    } catch (e) {
        throw e;
    }

    return deletedUserId;
}
