import {
    UserType,
    BettingRequest,
    GameResult,
    GameResultUpdate,
    BettingResultResponse,
    gameType
} from "../models/sample";
import {
    saveBetting,
    getBetting,
    updateBetting,
    saveGameResult,
    getGameResult,
    updateGameResult,
    saveMiniGameResult,
checkBettingResult, 
totalEarnedPointResult} from "../repositories/games";

//사용자 베팅 저장시 bettingId 반환
export const saveBettingData = async (
    bettingData: BettingRequest, 
    userId: number, 
    gameType: gameType
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

//사용자 베팅 수정
export const updateBettingData = async (
    bettingData: BettingRequest, 
    userId: number, 
    gameType: gameType
) => {
    let updatedData: BettingRequest | null;
    try {
        updatedData = await updateBetting(bettingData, userId, gameType);
        if (!bettingData) {
            throw new Error("Betting data not found");
        }
    } catch (e) {
        throw e;
    }
    return updatedData;
};

//게임 결과 저장
export const saveGameResultData = async (gameType: gameType, gameData: GameResult): Promise<string> => {
    let resultGameType: string;

    try {
        resultGameType = await saveGameResult(gameType, gameData);
    } catch (e) {
        throw e;
    }

    return resultGameType;
};

//게임 결과 조회
export const getGameResultData = async (gameType: gameType): Promise<GameResult> => {
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
export const updateGameResultData = async (gameType: gameType, gameData: GameResultUpdate): Promise<GameResult> => {
    let updatedGameResult: GameResult;

    try {
        updatedGameResult = await updateGameResult(gameType, gameData);
    } catch (e) {
        throw e;
    }

    return updatedGameResult;
};

//미니게임 결과 저장
export const saveMiniGameResultData = async (userId: number, result: boolean) => {
    try {
        const { times, totalPoint } = await saveMiniGameResult(userId, result);
        return { times, totalPoint };
    } catch (e) {
        throw e;
    }
};


//사용자 베팅 결과_점수차 계산 및 분류
const classifyScoreDifference = (gameType: gameType, KoreaScore: number, YonseiScore: number): number => {
    const difference = Math.abs(KoreaScore - YonseiScore);

    switch (gameType) {
        case 'baseball':
            if (difference >= 1 && difference <= 2) return 0;
            if (difference >= 3 && difference <= 4) return 1;
            if (difference >= 5 && difference <= 7) return 2;
            return 3;
        
        case 'basketball':
            if (difference >= 1 && difference <= 5) return 0;
            if (difference >= 6 && difference <= 10) return 1;
            if (difference >= 11 && difference <= 15) return 2;
            return 3;
        case 'hockey':
            if (difference == 1) return 0;
            if (difference == 2) return 1;
            if (difference == 3) return 2;
            return 3;
        case 'soccer':
            if (difference == 1) return 0;
            if (difference == 2) return 1;
            if (difference == 3) return 2;
            return 3;
        case 'rugby':
            if (difference >= 1 && difference <= 5) return 0;
            if (difference >= 6 && difference <= 10) return 1;
            if (difference >= 11 && difference <= 15) return 2;
            return 3;

        default:
            return -1;
    }
};

// 사용자 베팅 결과_결과 확인
export const checkBettingResultData = async (userId: number, gameType: gameType): Promise<BettingResultResponse> => {
    try {
        const betting = await getBettingData(userId, gameType);
        const gameResult = await getGameResultData(gameType);
        
        const winner = gameResult.KoreaScore > gameResult.YonseiScore ? 'KOREA' :
              gameResult.KoreaScore < gameResult.YonseiScore ? 'YONSEI' : 'DRAW';

        const scoreCase = classifyScoreDifference(gameType, gameResult.KoreaScore, gameResult.YonseiScore);

        if (scoreCase === -1) {
            throw new Error("Unknown GameType");
        }

        let success = false;
        let earnedPoint = 0;

        if (betting.predictedWinner === winner && Number(betting.predictedScore) === scoreCase) {
            success = true;
            earnedPoint = parseInt(betting.bettingPoint) * 3;
        }

        const bettingResponse: BettingResultResponse = {
            success,
            earnedPoint,
            totalPoint: parseInt(betting.bettingPoint) + earnedPoint,
        };

        const updatedBettingResponse = await checkBettingResult(bettingResponse, userId, gameType);
        return updatedBettingResponse;
    } catch (e) {
        throw e;
    }
};

export const totalEarnedPointData = async (userId: number, totalEarnedPoint: number) => {
    try {
        const result = await totalEarnedPointResult(userId, totalEarnedPoint);
        return result;
    } catch (e) {
        throw e;
    }
};