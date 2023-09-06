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

export const NFTDataSchema = z.object(
    {
        contractAddr: z.string(),
        tokenId: z.string(),
        image: z.string()
    }
)


export const getMetaData = async (req: Request, res: Response) => {
    try{

        const contractAddr = req.params.contractAddress;
        const tokenId = parseInt(req.params.tokenId);
        const metadata = await getMetaDataService(contractAddr, tokenId);
        return res.json(
            {
            "name": "버미와 수리",
            "description" : "버미와 수리는 고려대-연세대 정기전을 기념하여 찾아오게 된 캐릭터 NFT입니다.",
            "sendable": true,
            "hashtags": ["버미와수리","버미","수리", "연고전", "고연전", "정기전", "고려대", "연세대"],
            "layout": "general",
            "external_link": "https://www.bummysuri.com",
            ...metadata
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
