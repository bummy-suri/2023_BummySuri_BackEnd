import { Request, Response } from "express";
import { ZodError, z } from "zod";
import { PrismaError } from "../utils/errors";
import { AxiosError } from "axios";
import { getNFTCountService, mintingService } from "../services"; // 추후에 서비스 로직을 추가할 경우

export const teamTypeSchema = z.object({
    teamType: z.enum(["KOREA","YONSEI"])
});



export interface getNFTCountResponse {
    count: number;
}

export const getNFTCount = async (req: Request, res: Response) => {
    try {
        const team = teamTypeSchema.parse({ teamType: req.params.teamType });
        const NFTCountdData = await getNFTCountService(team.teamType);
        res.json(NFTCountdData as getNFTCountResponse);
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

export interface mintingResponse {
    accessToken: string;
    refreshToken?: string;
}

export const minting = async (req: Request, res: Response) => {
    try{
        const userid = req.userid;
        const team = teamTypeSchema.parse({ teamType: req.params.teamType });
        const result = await mintingService(userid, team.teamType);
        res.json({
            accessToken: result
        });

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