import { TokenType, UserType } from "../models/sample";
import { createUser } from "../repositories/users";
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