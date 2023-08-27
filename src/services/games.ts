import {
    UserType,
    BettingRequest,
    GameResult,
    GameResultUpdate,
    BettingResultResponse} from "../models/sample";
import {
    saveBetting,
    getBetting,
    saveGameResult,
    getGameResult,
    updateGameResult,
    saveMiniGamePoint,
    checkBettingResult } from "../repositories/games";

//사용자 베팅 저장
export const saveBettingData = async (
    bettingData: BettingRequest, 
    userId: number, 
    gameType: string
): Promise<string> => {
    let bettingId: string;

    try {
        bettingId = (await saveBetting(bettingData, userId, gameType)).toString();
    } catch (e) {
        throw e;
    }

    return bettingId;
};

//사용자 베팅 조회
export const getBettingData = async (userId: number, gameType: string): Promise<BettingRequest> => {
    let bettingData: BettingRequest | null;

    try {
        bettingData = await getBetting(userId, gameType);
        if (!bettingData) {
            throw new Error("Betting data not found");
        }
    } catch (e) {
        throw e;
    }

    return bettingData
};

//게임 결과 저장
export const saveGameResultData = async (gameType: string, gameData: GameResult): Promise<string> => {
    let resultGameType: string;

    try {
        resultGameType = await saveGameResult(gameType, gameData);
    } catch (e) {
        throw e;
    }

    return resultGameType;
};

//게임 결과 조회
export const getGameResultData = async (gameType: string): Promise<GameResult> => {
    let gameResult: GameResult | null;

    try {
        gameResult = await getGameResult(gameType);
        if (!gameResult) {
            throw new Error("Game result not found");
        }
    } catch (e) {
        throw e;
    }

    return gameResult;
};

//게임 결과 수정
export const updateGameResultData = async (gameType: string, gameData: GameResultUpdate): Promise<GameResult> => {
    let updatedGameResult: GameResult;

    try {
        updatedGameResult = await updateGameResult(gameType, gameData);
    } catch (e) {
        throw e;
    }

    return updatedGameResult;
};

//미니게임 결과 포인트에 반영
export const saveMiniGamePointData = async (userId: number): Promise<string> => {
    let updatedPoint: string;

    try {
        updatedPoint = (await saveMiniGamePoint(userId)).toString();
    } catch (e) {
        throw e;
    }

    return updatedPoint;
};

//사용자 베팅 결과_점수차 계산 및 분류
const classifyScoreDifference = (gameType: string, KoreaScore: number, YonseiScore: number): number => {
    const difference = Math.abs(KoreaScore - YonseiScore);

    switch (gameType) {
        case '야구':
            if (difference >= 1 && difference <= 2) return 0;
            if (difference >= 3 && difference <= 4) return 1;
            if (difference >= 5 && difference <= 7) return 2;
            return 3;
        
        case '농구':
            if (difference >= 1 && difference <= 5) return 0;
            if (difference >= 6 && difference <= 10) return 1;
            if (difference >= 11 && difference <= 15) return 2;
            return 3;
        case '빙구':
            if (difference == 1) return 0;
            if (difference == 2) return 1;
            if (difference == 3) return 2;
            return 3;
        case '축구':
            if (difference == 1) return 0;
            if (difference == 2) return 1;
            if (difference == 3) return 2;
            return 3;
        case '럭비':
            if (difference >= 1 && difference <= 5) return 0;
            if (difference >= 6 && difference <= 10) return 1;
            if (difference >= 11 && difference <= 15) return 2;
            return 3;

        default:
            return -1;
    }
};

// 사용자 베팅 결과_결과 확인
export const checkBettingResultData = async (userId: number, gameType: string): Promise<BettingResultResponse> => {
    try {
        const betting = await getBettingData(userId, gameType);
        const gameResult = await getGameResultData(gameType);
        
        const winner = gameResult.KoreaScore > gameResult.YonseiScore ? 'Korea' :
              gameResult.KoreaScore < gameResult.YonseiScore ? 'Yonsei' : 'draw';

        const scoreCase = classifyScoreDifference(gameType, gameResult.KoreaScore, gameResult.YonseiScore);

        if (scoreCase === -1) {
            throw new Error("Unknown GameType");
        }

        let success = false;
        let earnedPoint = 0;

        if (betting.predictedWinner === winner && Number(betting.predictedScore) === scoreCase) {
            success = true;
            earnedPoint = betting.bettingPoint * 3;
        }

        const bettingResponse: BettingResultResponse = {
            success,
            earnedPoint,
            totalPoint: betting.bettingPoint + earnedPoint,
        };

        const updatedBettingResponse = await checkBettingResult(bettingResponse, userId, gameType);
        return updatedBettingResponse;
    } catch (e) {
        throw e;
    }
};
