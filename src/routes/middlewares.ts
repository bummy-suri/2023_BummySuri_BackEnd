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
    cardAddress: z.string(),
    totalPoint: z.number(),
    isMinted: z.boolean(),
});

export const mintAuthenticateMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const isMinted = whetherMintedSchema.parse(req.body).isMinted;

    // isMinted 값이 true이고, /mint 라우트로의 요청인 경우 차단
    if (isMinted && req.originalUrl.includes('/mint')) {
        return res.status(403).send("Minting not allowed for users with isMinted set to true");
    }

    next();
};

