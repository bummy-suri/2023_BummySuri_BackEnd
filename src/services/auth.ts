import jwt from "jsonwebtoken";
import { TokenType } from "../models/sample";

const SECRET = process.env.TOKEN_SECRET as string || (() => { throw new Error('TOKEN_SECRET is not defined'); })();

const EXP = 60 * 60 * 24 * 7;


type JWTData = {
    userid: number;
    minted: boolean;
};


export const generateToken = (userid: number, minted: boolean): string => {
    let data = {
        userid: userid,
    }
    return jwt.sign(data, SECRET, { expiresIn: Math.floor(Date.now() / 1000) + EXP });
};

export const parseToken = (token: string): { ok: boolean, userid: number } => {
    try {
        const decoded = jwt.verify(token, SECRET) as JWTData;
        if (!decoded.userid) {
            throw new Error('failed to verify token');
        }
        return { ok: true, userid: decoded.userid };
    } catch {
        return { ok: false, userid: 0};
    }
};