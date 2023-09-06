import { ZodError, z } from "zod";
import { ClientError, PrismaError } from "../utils/errors";
import { AxiosError } from "axios";
import { Request, Response } from "express";
import { grantUserService , getUserService, deleteUserDataService} from "../services";



export const authenticateRequestSchema = z.object({
    requestKey: z.string()
});

export interface authenticateResponse {
    accessToken: string;
    refreshToken?: string;
}

export const authenticate = async (req: Request, res: Response) => {
    try {
        const authenticateRequest = authenticateRequestSchema.parse(req.body);
    
        const { access } = await grantUserService(authenticateRequest.requestKey)

        res.json({
            accessToken: access
        } as authenticateResponse)

    } catch (error) {

        if (error instanceof ZodError) {
            res.status(400).send(error.message);
            return
        }
        if (error instanceof ClientError) {
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


export interface getUserResponse {
    cardAddress: string;
    totalPoint: number;
    isMinted: boolean;    
}


export const getUser = async (req: Request, res: Response) => {
    try {
        const userid = req.userid;
        const userData = await getUserService(userid);
        const response: getUserResponse = {
            cardAddress: userData.userCardAddress,
            totalPoint: userData.totalPoint,
            isMinted: userData.isMinted
        }
        res.json(response);

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

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userid = req.userid;
        await deleteUserDataService(userid);

        res.sendStatus(204);

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