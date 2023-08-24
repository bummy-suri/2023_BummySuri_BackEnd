import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.TOKEN_SECRET as string;

type JWTData = {
    uuid: string;
    expirationDate: string;
    userid: string;
};

declare global {
    namespace Express {
        interface Request {
            userid?: string;
        }
    }
}

export const generateToken = (data: JWTData): string => {
    return jwt.sign(data, SECRET, { expiresIn: data.expirationDate });
};

export const parseToken = (token: string): { ok: boolean, userid?: string } => {
    try {
        const decoded = jwt.verify(token, SECRET) as JWTData;
        return { ok: true, userid: decoded.userid };
    } catch {
        return { ok: false };
    }
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.sendStatus(401);
    }

    const token = authorization.split(' ')[1];
    const { ok, userid } = parseToken(token);

    if (!ok || !userid || userid === "0") {
        return res.sendStatus(403);
    }

    req.userid = userid;
    next();
};


