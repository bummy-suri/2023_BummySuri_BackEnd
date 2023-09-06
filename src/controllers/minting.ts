import { Request, Response } from "express";
import { ZodError, z } from "zod";
import { PrismaError } from "../utils/errors";
import { AxiosError } from "axios";
import { getNFTCountService, mintingService, getMetaDataService, saveNFTDataService } from "../services";

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
        res.json({count: 2301})
        //res.json(NFTCountdData as getNFTCountResponse);
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
        const team = teamTypeSchema.parse({ teamType: req.body.teamType });
        const result = await mintingService(userid, team.teamType);
        res.json({
            accessToken: "mocking access token"
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

export const NFTDataSchema = z.object(
    {
        contractAddr: z.string(),
        tokenId: z.string(),
        imageHash: z.string()
    }
)

export const saveNFTData = async (req: Request, res: Response) => {
    try {
        const NFTData = NFTDataSchema.parse(req.body);
        const userId = req.userid;
        const NFTDataWithOwner = { owner: userId,
            ...NFTData };
        const NFTMetaData= await saveNFTDataService(NFTDataWithOwner);
        res.json(NFTMetaData)

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
}

export const getMetaData = async (req: Request, res: Response) => {
    try{
        const contractAddr = req.params.contractAddress;
        const tokenId = req.params.tokenId;
        const metadata = await getMetaDataService(contractAddr, tokenId);
        return res.json(metadata);
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
