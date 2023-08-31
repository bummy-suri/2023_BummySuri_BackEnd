import { Request, Response } from "express";
import { ZodError, z } from "zod";
import { PrismaError } from "../utils/errors";
import { AxiosError } from "axios";
import { checkBettingResultService, totalEarnedPointService } from "../services"; // 실제 서비스 호출은 주석 처리

// 베팅 결과 확인을 위한 요청 스키마
export const checkBettingResultRequestSchema = z.object({
    selected: z.boolean(),
    playing: z.string(),
    predictedWinner: z.string(),
    predictedScore: z.string(),
    bettingPoint: z.number()
});

// 베팅 결과 확인 응답 스키마
export interface CheckBettingResultResponse {
    success: boolean;
    earnedPoint: number;
    totalPoint: number;
}

export const checkBettingResult = async (req: Request, res: Response) => {
    try {
        const userid = req.userid;
        const gameType = req.params.gameType;
        const bettingData = checkBettingResultRequestSchema.parse(req.body);

        const result = await checkBettingResultService(userid, gameType);
        res.json(result);
        
        // const dummyResult: CheckBettingResultResponse = {
        //     success: true,
        //     earnedPoint: 100,
        //     totalPoint: 200
        // };

        // res.json(dummyResult);

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
export const updateBettingPointsRequestSchema = z.object({
    totalEarnedPoint: z.number()
});

export const totalEarnedPoints = async (req: Request, res: Response) => {
    try {
        const userid = req.userid;
        const requestData = updateBettingPointsRequestSchema.parse(req.body);

        const result = await totalEarnedPointService(userid, requestData.totalEarnedPoint);
        res.json(result);

    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).send(error.message);
            return;
        }
        if (error instanceof PrismaError) {
            res.status(503).send(error.message);
            return;
        }
        if (error instanceof AxiosError) {
            res.status(502).send(error.message);
            return;
        }
        if (error instanceof Error) {
            res.status(500).send(error.message);
            return;
        }      
    }
};
