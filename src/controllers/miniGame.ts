import { Request, Response } from "express";
import { ZodError, z } from "zod";
import { PrismaError } from "../utils/errors";
import { AxiosError } from "axios";
// import { changeMiniGamePointsService } from "../services"; // 추후에 서비스 로직을 추가할 경우

export const miniGamePointChangeRequestSchema = z.object({
    results: z.string(),
});

// 미니게임 포인트 변동 POST
export const changeMiniGamePoints = async (req: Request, res: Response) => {
    try {
        const requestData = miniGamePointChangeRequestSchema.parse(req.body);
        
        // 실제 서비스 로직 호출 예시
        // const { totalPoint } = await changeMiniGamePointsService(requestData.results);

        // 더미 데이터로 응답
        const dummyTotalPoint = 100;

        res.json({
            totalPoint: dummyTotalPoint
        });

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
