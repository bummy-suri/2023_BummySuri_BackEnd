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

    req.userid = userid;  // req 객체에 userid를 저장하여 후속 미들웨어나 라우터에서 사용할 수 있게 함
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

    // 여기서 userid와 isMinted 등의 값을 다음 미들웨어나 라우터 핸들러에서 사용할 수 있도록 req 객체에 추가할 수 있습니다.
    // 예: req.userid = userid;

    next();
};

