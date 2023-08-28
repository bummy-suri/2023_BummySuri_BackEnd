import { ZodError, z } from "zod";
import { PrismaError } from "../utils/errors";
import { AxiosError } from "axios";
import { Request, Response } from "express";
import { grantUserService } from "../services";



export const authenticateRequestSchema = z.object({
    requestKey: z.string(),
});

export interface authenticateResponse {
    accessToken: string;
    refreshToken?: string;
}

export const authenticate = async (req: Request, res: Response) => {
    try {
        const authenticateRequest = authenticateRequestSchema.parse(req.body);

        const { access } = await grantUserService(authenticateRequest.requestKey)

        res.send({
            accessToken: access,
        } as authenticateResponse)

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