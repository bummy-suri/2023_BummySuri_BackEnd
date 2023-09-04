import { PrismaClient } from "@prisma/client";
import { PrismaError } from "../utils/errors";
import { MiniGameType, MiniGameResponse } from "../models/sample";

const prisma = new PrismaClient();

export const saveMiniGameResult = async (userId: number, result: string, miniGameType: string) : Promise<MiniGameResponse> => {
    const POINTS_FOR_WIN = 200;
    
    const user = await prisma.user.findUnique({ where: { id: userId }});
    if (!user) throw new Error("User not found");

    const miniGame = await prisma.miniGame.findFirst({ where: { userId } });
    if (!miniGame) throw new Error("MiniGame record not found");

    let updatedTotalPoint = user.totalPoint;
    let updatedTimes = miniGame.times;
    let updatedQuiz = miniGame.quiz;
    
    if (result === "win") {
        updatedTotalPoint += POINTS_FOR_WIN;
    }
    
    if (miniGameType === "가위바위보") {
        updatedTimes += 1;
    }

    if (miniGameType === "그림 퀴즈") {
        updatedQuiz = false;
    }

    await prisma.miniGame.update({
        where: { id: miniGame.id },
        data: { times: updatedTimes, quiz: updatedQuiz }
    });

    await prisma.user.update({
        where: { id: userId },
        data: { totalPoint: updatedTotalPoint }
    });

    return { times: updatedTimes, quiz: updatedQuiz, totalPoint: updatedTotalPoint };
};
