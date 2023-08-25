import { PrismaClient } from "@prisma/client";
import { PrismaError } from "../utils/errors";
import { BettingRequest, BettingResultResponse, UserType, GameResult, GameResultUpdate, BettingResponse} from "../models/sample";

const prisma = new PrismaClient();

//사용자 베팅 정보 저장
export const saveBetting = async (
    bettingData: BettingRequest, 
    userId: number, 
    gameType: string
): Promise<number> => {
    return prisma.betting.create({
        data: {
            userId: userId,
            gameType: gameType,
            ...bettingData
        }
    }).then((result) => {
        return result.id;
    }).catch((e) => {
        throw new PrismaError(e?.message);
    });
}

//사용자 베팅 정보 조회
export const getBetting = async (bettingId: number): Promise<BettingRequest | null> => {
    return prisma.betting.findUnique({
        where: {
            id: bettingId
        }
    }).then((result) => {
        if (result) {
            return {
                selected: result.selected,
                playing: result.playing,
                predictedWinner: result.predictedWinner,
                predictedScore: result.predictedScore,
                bettingPoint: result.bettingPoint
            };
        } else {
            return null;
        }
    }).catch((e) => {
        throw new PrismaError(e?.message);
    });
}

//게임 결과 저장
export const saveGameResult = async (gameType: string, gameData: GameResult): Promise<string> => {
    return prisma.game.create({
        data: {
            gameType: gameType,
            ...gameData
        },
    }).then((result) => {
        return result.gameType;
    }).catch((e) => {
        throw new PrismaError(e?.message);
    });
}

//게임 결과 조회
export const getGameResult = async (gameType: string): Promise<GameResult | null> => {
    return prisma.game.findUnique({
        where: {
            gameType: gameType
        }
    }).then((result) => {
        if (result) {
            return {
                playing: result.playing,
                KoreaScore: result.KoreaScore,
                YonseiScore: result.YonseiScore,
            };
        } else {
            return null;
        }
    }).catch((e) => {
        throw new PrismaError(e?.message);
    });
}

//게임 결과 수정
export const updateGameResult = async (gameType: string, gameData: GameResultUpdate): Promise<GameResult> => {
    return prisma.game.update({
        where: {
            gameType: gameType
        },
        data: gameData
    }).then((result) => {
        return {
            playing: result.playing,
            KoreaScore: result.KoreaScore,
            YonseiScore: result.YonseiScore,
        };
    }).catch((e) => {
        throw new PrismaError(e?.message);
    });
}

//베팅 결과 확인

//미니게임 저장
export const saveMiniGamePoint = async (userId: number): Promise<number> => {
    return prisma.user.findUnique({
        where: {
            id: userId
        }
    }).then((user) => {
        if (!user) {
            throw new Error("User not found");
        }

        return prisma.user.update({
            where: {
                id: userId
            },
            data: {
                totalPoint: user.totalPoint + 300,
            },
        });
    }).then((updatedUser) => {
        return updatedUser.totalPoint;
    }).catch((e) => {
        throw new PrismaError(e?.message);
    });
};
