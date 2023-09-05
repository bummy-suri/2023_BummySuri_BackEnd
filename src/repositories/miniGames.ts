import { PrismaClient } from "@prisma/client";
import { PrismaError } from "../utils/errors";
import { MiniGameType, MiniGameResponse } from "../models/sample";

const prisma = new PrismaClient();

export const saveMiniGameResult = async (userId: number, result: string, minigameType: string) : Promise<MiniGameResponse> => {
    const currentDate = new Date().toISOString().split('T')[0];
    let POINTS_FOR_WIN = minigameType === "가위바위보" ? 100 : 200;
    const POINTS_FOR_LOSE = 0;

    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) throw new Error("User not found");

    let miniGame = await prisma.miniGame.findFirst({
        where: { userId, date: currentDate }
    });
    let updatedTimes : number;
    let updatedQuiz : boolean;


    if (!miniGame) {
        const createdMiniGame = await prisma.miniGame.create({
            data: {
                userId: userId,
                date: currentDate,
                times: minigameType === "가위바위보" ? 1 : 0,
                quiz: minigameType !== "가위바위보" ? false : true
            }
        });
    }

    miniGame = await prisma.miniGame.findFirst({
        where: { userId, date: currentDate }
    });

    if (!miniGame)
        throw new Error("MiniGame not found");

    updatedTimes = miniGame.times;
    updatedQuiz = miniGame.quiz;

    if(minigameType === "가위바위보") {
        updatedTimes += 1;
    } else {
        updatedQuiz = false;
    }

    const updatedTotalPoint = user.totalPoint + (result === "win" ? POINTS_FOR_WIN : POINTS_FOR_LOSE);
    const pointDate = new Date().toISOString();

    // Update MiniGame
    await prisma.miniGame.update({
        where: { id: miniGame.id },
        data: { times: updatedTimes, quiz: updatedQuiz }
    });

    // Update User totalPoint
    await prisma.user.update({
        where: { id: userId },
        data: { totalPoint: updatedTotalPoint,
                pointDate: pointDate
         }
    });

    return { times: updatedTimes, totalPoint: updatedTotalPoint, quiz: updatedQuiz };
};
