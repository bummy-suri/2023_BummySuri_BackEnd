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
        return res.status(401).json({ message: 'Authorization token is missing.' });
    }

    const { ok, userid } = parseToken(token);

    if (!ok) {
        return res.status(403).json({ message: 'Invalid or expired authorization token.' });
    }

    req.userid = userid;
    next();
};


export const mintAuthenticateMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing.' });
    }

    const { ok, userid, isMinted } = parseToken(token);

    if (!ok) {
        return res.status(403).json({ message: 'Invalid or expired authorization token.' });
    }

    next();
};

