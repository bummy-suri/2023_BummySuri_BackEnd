import { Request, Response } from "express";
import { ZodError, z } from "zod";
import { PrismaError } from "../utils/errors";
import { AxiosError } from "axios";
import { getNFTCountService, mintingService, getMetaDataService} from "../services";

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
        if (result === false) {
            res.status(202).send("Already minted");
        }
        res.json({
            accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjExNTQsImlzTWludGVkIjpmYWxzZSwiaWF0IjoxNjkzOTU4NTA0LCJleHAiOjMzODg1MjE4MDh9.e64bYjXH7P4USYCIG6SnWJyJEjpNkp6YXmUQ9oF5_FM"
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
        image: z.string()
    }
)


export const getMetaData = async (req: Request, res: Response) => {
    try{

        const contractAddr = teamTypeSchema.parse({ teamType: req.params.contractAddress });
        const tokenId = parseInt(req.params.tokenId);
        const metadata = await getMetaDataService(contractAddr.teamType, tokenId);
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
