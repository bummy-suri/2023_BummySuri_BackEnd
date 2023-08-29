import { Request, Response } from "express";
import { ZodError, z } from "zod";
import { PrismaError } from "../utils/errors";
import { AxiosError } from "axios";
import { mintUserService , getUserService, deleteUserDataService } from "../services";


export const registerUserRequestSchema = z.object({
    id: z.number(),
    userCardAddress: z.string(),
    name: z.string(),
    univ: z.enum(['YONSEI', 'KOREA']),
    NFT_image: z.string(),
    totalPoint: z.number()
});

export interface registerUserResponse {
    accessToken: string;
    refreshToken?: string;
}


export const register = async (req: Request, res: Response) => {
    try {
        const mintRequest = registerUserRequestSchema.parse(req.body);

        // const { access, refresh } = await mintUserService({
        //     id: mintRequest.id,
        //     userCardAddress: mintRequest.userCardAddress,
        //     name: mintRequest.name,
        //     univ: mintRequest.univ,
        //     NFT_image: mintRequest.NFT_image,
        //     totalPoint: mintRequest.totalPoint
        // })

        // res.send({
        //     accessToken: access,
        //     refreshToken: refresh
        // } as registerUserResponse)

        // const userData = await mintUserService({
        //         id: mintRequest.id,
        //         userCardAddress: mintRequest.userCardAddress,
        //         name: mintRequest.name,
        //         univ: mintRequest.univ,
        //         NFT_image: mintRequest.NFT_image,
        //         totalPoint: mintRequest.totalPoint
        //     })
        // res.send(userData)

        const userData = {
            id: 32424,
            userCardAddress: "235235",
            name: "김민수",
            univ: "KOREA",
            NFT_image: "sdf",
            totalPoint: 100
        }
        res.send(userData)

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
    univ: 'YONSEI' | 'KOREA';
    totalPoint: number;
}

        
export const getUser = async (req: Request, res: Response) => {
    try {
        const userid = parseInt(req.params.userid);
        // const userData = await getUserService(userid);
        // res.send(userData);

        const dummyUserData = {
            univ: "YONSEI",
            totalPoint: 1000
        };
        res.json(dummyUserData as getUserResponse);

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
        const userid = parseInt(req.params.userid);
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