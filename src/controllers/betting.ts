import { Request, Response } from "express";
import { ZodError, z } from "zod";
import { PrismaError } from "../utils/errors";
import { AxiosError } from "axios";
import { saveBettingSerVice, getBettingService } from "../services"; // 실제 서비스 호출은 주석 처리

// 베팅 저장을 위한 요청 스키마
export const saveBettingRequestSchema = z.object({
    selected: z.boolean(),
    playing: z.string(),
    predictedWinner: z.string(),
    predictedScore: z.string(),
    bettingPoint: z.number()
});

// 베팅 조회 응답 스키마
export interface GetBettingResponse {
    selected: boolean;
    playing: string;
    predictedWinner: string;
    predictedScore: string;
    bettingPoint: number;
}

export const saveBetting = (req: Request, res: Response) => {
    try {
        const bettingData = saveBettingRequestSchema.parse(req.body);
        const userid = req.userid;
        const gameType = req.params.gameType;

        // const result = await saveBettingService(bettingData, userid, gameType);

        res.sendStatus(201);

    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).send(error.message);
            return
        }
        if (error instanceof PrismaError) {
            res.status(503).send(error.message);
            return
        }
        if (error instanceof AxiosError) {
            res.status(502).send(error.message);
            return
        }
        if (error instanceof Error) {
            res.status(500).send(error.message);
            return
        }      
    }
};

export const getBetting = (req: Request, res: Response) => {
    try {
        const userid = req.userid;
        const gameType = req.params.gameType;
        // const result = await saveBettingService(userid, gameType);
        // 더미 데이터
        const dummyData: GetBettingResponse = {
            selected: true,
            playing: "Korea vs Yonsei",
            predictedWinner: "Korea",
            predictedScore: "1-2",
            bettingPoint: 100
        };

        res.json(dummyData);

    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).send(error.message);
            return
        }
        if (error instanceof PrismaError) {
            res.status(503).send(error.message);
            return
        }
        if (error instanceof AxiosError) {
            res.status(502).send(error.message);
            return
        }
        if (error instanceof Error) {
            res.status(500).send(error.message);
            return
        }      
    }
};
