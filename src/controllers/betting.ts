import { Request, Response } from "express";
import { ZodError, z } from "zod";
import { PrismaError } from "../utils/errors";
import { AxiosError } from "axios";
import { saveBettingService, getBettingService, updateBettingService } from "../services";

// 베팅 저장을 위한 요청 스키마
export const saveBettingRequestSchema = z.object({
    selected: z.boolean(),
    playing: z.enum(["경기 중", "경기 전", "경기 종료"]),
    predictedWinner: z.enum(["KOREA", "YONSEI", "DRAW"]),
    predictedScore: z.enum(["0","1","2","3"]),
    bettingPoint: z.enum(["100", "200", "300", "400", "500"])
});

// 베팅 조회 응답 스키마
export interface GetBettingResponse {
    selected: boolean;
    playing: string;
    predictedWinner: string;
    predictedScore: string;
    bettingPoint: number;
}

export const gameTypeSchema = z.object({
    gameType: z.enum(["baseball", "basketball", "hockey", "soccer", "rugby"])
});

export const saveBetting = async (req: Request, res: Response) => {
    try {
        const bettingData = saveBettingRequestSchema.parse(req.body);
        const userid = req.userid;
        const { gameType } = gameTypeSchema.parse({ gameType: req.params.gameType });

        const result = await saveBettingService(bettingData, userid, gameType);

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

export const getBetting = async (req: Request, res: Response) => {
    try {
        const userid = req.userid;
        const { gameType } = gameTypeSchema.parse({ gameType: req.params.gameType });
        const result = await getBettingService(userid, gameType);
        res.json(result);

        // // 더미 데이터
        // const dummyData: GetBettingResponse = {
        //     selected: true,
        //     playing: "경기 전",
        //     predictedWinner: "KOREA",
        //     predictedScore: "1-2점차",
        //     bettingPoint: 100
        // };

        // res.json(dummyData);

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

export const updateBettingRequestSchema = z.object({
    selected: z.boolean(),
    playing: z.enum(["경기 중", "경기 전", "경기 종료"]),
    predictedWinner: z.enum(["KOREA", "YONSEI", "DRAW"]),
    predictedScore: z.enum(["0","1","2","3"]),
    bettingPoint: z.enum(["100", "200", "300", "400", "500"])
});

export const updateBetting = async (req: Request, res: Response) => {
    try {
        const bettingData = updateBettingRequestSchema.parse(req.body);
        const userid = req.userid;
        const { gameType } = gameTypeSchema.parse({ gameType: req.params.gameType });

        const result = await updateBettingService(bettingData, userid, gameType);
        res.send(result);


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


