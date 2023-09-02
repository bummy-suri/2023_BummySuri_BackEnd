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


export const mintAuthenticateMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    const { ok, userid, isMinted } = parseToken(token);

    if (!ok || !userid) {
        return res.sendStatus(403);
    }

    if (isMinted && req.originalUrl.includes('/mint')) {
        return res.status(403).send("Minting not allowed");
    }

    next();
};

