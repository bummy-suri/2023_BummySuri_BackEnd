import { Request, Response } from "express";
import { ZodError, z } from "zod";
import { PrismaError } from "../utils/errors";
import { AxiosError } from "axios";
import { saveGameResultService, getGameResultService, updateGameResultService } from "../services";

export const gameResultRequestSchema = z.object({
    playing: z.enum(["경기 중", "경기 전", "경기 종료"]),
    KoreaScore: z.number(),
    YonseiScore: z.number(),
});

export const gameTypeSchema = z.object({
    gameType: z.enum(["baseball", "basketball", "hockey", "soccer", "rugby"])
});

// 경기 결과 POST
export const createGameResult = async (req: Request, res: Response) => {
    try {
        const gameData = gameResultRequestSchema.parse(req.body);
        const { gameType } = gameTypeSchema.parse({ gameType: req.params.gameType });
        const result = await saveGameResultService(gameType, gameData);
        res.sendStatus(201);  // successfully created

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

// 경기 결과 조회 GET
export const getGameResult = async (req: Request, res: Response) => {
    try {
        const { gameType } = gameTypeSchema.parse({ gameType: req.params.gameType });
        const result = await getGameResultService(gameType);
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

// 경기 결과 수정 PUT
export const updateGameResult = async (req: Request, res: Response) => {
    try {
        const { gameType } = gameTypeSchema.parse({ gameType: req.params.gameType });
        const updatedGameData = gameResultRequestSchema.parse(req.body);
        
        const result = await updateGameResultService(gameType, updatedGameData);
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
