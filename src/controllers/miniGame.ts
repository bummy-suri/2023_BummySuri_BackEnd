import { Request, Response } from "express";
import { ZodError, z } from "zod";
import { PrismaError } from "../utils/errors";
import { AxiosError } from "axios";
import { saveMiniGamePointService, saveMiniGameTimesService, getTimesService } from "../services"; // 추후에 서비스 로직을 추가할 경우

export const miniGamePointChangeRequestSchema = z.object({
    results: z.string(),
});

export const miniGameTimesChangeRequestSchema = z.object({
    times: z.number(),
});
export interface getTimesResponse {
    times: number;
}
// 미니게임 횟수 POST
export const miniGameTimes = async (req: Request, res: Response) => {
    try {
        const userId = req.userid;
        const getTimes = miniGameTimesChangeRequestSchema.parse(req.body);
        const times = getTimes.times;
        const result = await saveMiniGameTimesService(userId, times);
        res.json(result);
        // const dummyTimes = 1;
        // res.json({
        //     times: dummyTimes
        // });
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

//미니게임 횟수 GET
export const getTimes = async (req: Request, res: Response) => {
    try {
        const userid = req.userid
        const result = await getTimesService(userid);
        res.json(result);
        // // dummuData
        // const dummyUserData = {
        //     times: 1
        // };

        // res.send(dummyUserData as getTimesResponse);


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

// 미니게임 포인트 변동 POST
export const changeMiniGamePoints = async (req: Request, res: Response) => {
    try {
        const userId = req.userid;
        
        const totalPoint = await saveMiniGamePointService(userId);
        res.json(totalPoint);

        // // 더미 데이터로 응답
        // const dummyTotalPoint = 100;

        // res.json({
        //     totalPoint: dummyTotalPoint
        // });

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

