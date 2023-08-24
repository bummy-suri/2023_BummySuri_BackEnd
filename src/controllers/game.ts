import { Request, Response } from "express";
import { ZodError, z } from "zod";
import { PrismaError } from "../utils/errors";
import { AxiosError } from "axios";
// import { createGameResultService, getGameResultService, updateGameResultService } from "../services";

export const gameResultRequestSchema = z.object({
    playing: z.string(),
    KoreaScore: z.number(),
    YonseiScore: z.number(),
});

// 경기 결과 POST
export const createGameResult = async (req: Request, res: Response) => {
    try {
        const gameData = gameResultRequestSchema.parse(req.body);
        
        // await createGameResultService(gameData);

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
        // const gameData = await getGameResultService(req.params.gameType);

        // Dummy data
        const dummyGameResult = {
            playing: "Soccer",
            KoreaScore: 2,
            YonseiScore: 1
        };

        res.json(dummyGameResult);

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
        const updatedGameData = gameResultRequestSchema.parse(req.body);
        
        // const updatedGame = await updateGameResultService(req.params.gameType, updatedGameData);

        // Dummy data
        const dummyUpdatedGameResult = {
            playing: "Soccer",
            KoreaScore: 3,
            YonseiScore: 2
        };

        res.json(dummyUpdatedGameResult);

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
