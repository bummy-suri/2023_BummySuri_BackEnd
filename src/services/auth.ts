import jwt from "jsonwebtoken";
import { TokenType } from "../models/sample";

const SECRET = process.env.TOKEN_SECRET as string || (() => { throw new Error('TOKEN_SECRET is not defined'); })();

const EXP = 60 * 60 * 24 * 7;


type JWTData = {
    userid: string;
};


export const generateToken = (userid: string): string => {
    let data = {
        userid: userid,
    }
    return jwt.sign(data, SECRET, { expiresIn: Math.floor(Date.now() / 1000) + EXP });
};

export const parseToken = (token: string): { ok: boolean, userid: string } => {
    try {
        const decoded = jwt.verify(token, SECRET) as JWTData;
        if (decoded.userid == undefined || decoded.userid == "0") {
            return { ok: false, userid: "" }
        }
        return { ok: true, userid: decoded.userid };
    } catch {
        return { ok: false, userid: ""};
    }
};