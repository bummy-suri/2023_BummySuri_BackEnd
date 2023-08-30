import { handleApp2AppResultStateAPIs } from "../apis";
import { TokenType, UserType } from "../models/sample";
import { createUser, getUserByCardAddress, getUser, deleteUser } from "../repositories/users";
import { generateToken } from "./auth";


export const mintUser = async (user: UserType): Promise<TokenType> => {
    let token: string = ''
    let userid: string = ''

    try {
        const existingUser = await getUserByCardAddress(user.userCardAddress);
        
        if (existingUser) {
            userid = existingUser.id.toString();
        } else {
            userid = (await createUser(user)).toString();
        }

        token = generateToken(userid);

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
