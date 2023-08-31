import { Request, Response } from "express";
import { ZodError, z } from "zod";
import { PrismaError } from "../utils/errors";
import { AxiosError } from "axios";
import { getNFTCountService } from "../services"; // 추후에 서비스 로직을 추가할 경우



export interface getNFTCountResponse {
    KoreaCount: number;
    YonseiCount: number;
}

export const getNFTCount = async (req: Request, res: Response) => {
    try {
        const NFTCountdData = await getNFTCountService();
        res.json(NFTCountdData);
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