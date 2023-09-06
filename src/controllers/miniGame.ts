import { Request, Response } from "express";
import { ZodError, z } from "zod";
import { PrismaError } from "../utils/errors";
import { AxiosError } from "axios";
import { saveMiniGameResultService, getMiniGameResultService } from "../services";


export const miniGameRequestSchema = z.object({
    result: z.enum(["win", "lose"]),
    miniGameType: z.enum(["가위바위보", "그림 퀴즈"])
});
export interface getMiniGameResultResponse {
    times: number;
    quiz: boolean;
    totalPoint: number;
}

export const saveMiniGameResult = async (req: Request, res: Response) => {
    try {
        const userId = req.userid;
        const { result, miniGameType } = miniGameRequestSchema.parse(req.body);
        const updatedData = await saveMiniGameResultService(userId, result, miniGameType);
        res.json(updatedData);
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

export const getMiniGame = async (req: Request, res: Response) => {
    try{
        const userId = req.userid;
        const currentDate = new Date().toISOString().split('T')[0];
        const miniGame = await getMiniGameResultService(userId, currentDate);
        res.json(miniGame);
    } catch (error){
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
