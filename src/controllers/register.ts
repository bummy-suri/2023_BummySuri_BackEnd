import { Request, Response } from "express";
import { ZodError, z } from "zod";
import { PrismaError } from "../utils/errors";
import { AxiosError } from "axios";
import { mintUserService } from "../services";



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


export const register = async (req: Request, res: Response) => {
    try {
        const mintRequest = registerUserRequestSchema.parse(req.body);

        const { access, refresh } = await mintUserService({
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

export interface getUserResponse {
    userCardAddress: string;
    name: string;
    univ: 'YONSEI' | 'KOREA';
    phone: string;
    studentId: string;
}

export const getUser = (req: Request, res: Response) => {
    try {
        // const userData = getUserService();

        // dummuData
        const dummyUserData = {
            userCardAddress: "0x123456789abcdef",
            name: "John Doe",
            univ: "YONSEI",
            phone: "010-1234-5678",
            studentId: "12345678"
        };

        res.send(dummyUserData as getUserResponse);


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
        //await deleteUserService();

        res.sendStatus(204);  // successfully deleted

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