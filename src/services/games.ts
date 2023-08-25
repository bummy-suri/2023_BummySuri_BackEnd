import {
    UserType,
    BettingRequest,
    BettingResponse,
    GameResult,
    GameResultUpdate,
    BettingResultResponse} from "../models/sample";
import {
    saveBetting,
    getBetting,
    saveGameResult,
    getGameResult,
    updateGameResult,
    saveMiniGamePoint } from "../repositories/games";

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
    
    export const getBettingData = async (bettingId: number): Promise<BettingRequest> => {
        let bettingData: BettingRequest | null;
    
        try {
            bettingData = await getBetting(bettingId);
            if (!bettingData) {
                throw new Error("Betting data not found");
            }
        } catch (e) {
            throw e;
        }
    
        return bettingData
    };
    
    export const saveGameResultData = async (gameType: string, gameData: GameResult): Promise<string> => {
        let resultGameType: string;
    
        try {
            resultGameType = await saveGameResult(gameType, gameData);
        } catch (e) {
            throw e;
        }
    
        return resultGameType;
    };
    
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
    
    export const updateGameResultData = async (gameType: string, gameData: GameResultUpdate): Promise<GameResult> => {
        let updatedGameResult: GameResult;
    
        try {
            updatedGameResult = await updateGameResult(gameType, gameData);
        } catch (e) {
            throw e;
        }
    
        return updatedGameResult;
    };
    
    export const saveMiniGamePointData = async (userId: number): Promise<string> => {
        let updatedPoint: string;
    
        try {
            updatedPoint = (await saveMiniGamePoint(userId)).toString();
        } catch (e) {
            throw e;
        }
    
        return updatedPoint;
    };
    
    