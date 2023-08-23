import { Request, Response } from "express";
import { ZodError, z } from "zod";
import { PrismaError } from "../utils/errors";
import { AxiosError } from "axios";
import { registerUserService } from "../services";



export const registerUserRequestSchema = z.object({
    userCardAddress: z.string(),
    name: z.string(),
    univ: z.enum(['YONSEI', 'KOREA']),
    phone: z.string().regex(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/),
    studentId: z.string(),
});

export interface registerUserResponse {
    accessToken: string;
    refreshToken: string;
}


export const register = (req: Request, res: Response) => {
    try {
        const mintRequest = registerUserRequestSchema.parse(req.body);

        const { access, refresh } = registerUserService({
            userCardAddress: mintRequest.userCardAddress,
            name: mintRequest.name,
            univ: mintRequest.univ,
            phone: mintRequest.phone,
            studentId: mintRequest.studentId
        })

        res.send({
            accessToken: access,
            refreshToken: refresh
        } as registerUserResponse)

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
