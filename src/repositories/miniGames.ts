import { PrismaClient } from "@prisma/client";
import { PrismaError } from "../utils/errors";
import { MiniGameType, MiniGameResponse } from "../models/sample";

const prisma = new PrismaClient();

export const saveMiniGameResult = async (userId: number, result: string, gameType: string) : Promise<MiniGameResponse> => {
    const currentDate = new Date().toISOString().split('T')[0];
    let POINTS_FOR_WIN = gameType === "가위바위보" ? 100 : 200;
    const POINTS_FOR_LOSE = 0;

    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) throw new Error("User not found");

    // date와 userId를 기반으로 레코드 찾기
    const miniGame = await prisma.miniGame.findFirst({
        where: { userId, date: currentDate }
    });

    if (!miniGame) {
        throw new Error("MiniGame record not found for the current date");
    }

    let updatedTimes = miniGame.times;
    let updatedQuiz = miniGame.quiz;

    if(gameType === "가위바위보") {
        updatedTimes += 1;
    } else {
        updatedQuiz = false;
    }

    const updatedTotalPoint = user.totalPoint + (result === "win" ? POINTS_FOR_WIN : POINTS_FOR_LOSE);

    // Update MiniGame
    await prisma.miniGame.update({
        where: { id: miniGame.id },
        data: { times: updatedTimes, quiz: updatedQuiz }
    });

    // Update User totalPoint
    await prisma.user.update({
        where: { id: userId },
        data: { totalPoint: updatedTotalPoint }
    });

    return { times: updatedTimes, totalPoint: updatedTotalPoint, quiz: updatedQuiz };
};
