import { TokenType, UserType } from "../models/sample";




export const registerUser = (user: UserType) : TokenType => {
    return {
        access: 'access',
    }
}