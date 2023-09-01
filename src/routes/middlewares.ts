import { Request, Response, NextFunction } from "express";
import { parseToken } from "../services/auth";
import { z } from "zod";



declare global {
    namespace Express {
        interface Request {
            userid: number;
        }
    }
}


export const authenticateMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    const { ok, userid } = parseToken(token);

    if (!ok) {
        return res.sendStatus(403);
    }

    req.userid = userid;
    next();
};


export const whetherMintedSchema = z.object({
    isMinted: z.boolean(),
});

export const mintAuthenticateMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const whetherMinted = whetherMintedSchema.parse(req.body);
    if (!whetherMinted.isMinted) {
        return res.sendStatus(403);
    }
    next();
}

