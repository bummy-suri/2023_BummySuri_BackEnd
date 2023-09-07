import {
    MiniGameResponse,
    GetMiniGameType
} from "../models/sample";
import {
    saveMiniGameResult,
    getMiniGame
} from "../repositories/miniGames";

export const saveMiniGameResultData = async (userId: number, result: string, miniGameType: string): Promise<MiniGameResponse> => {
    try {
        const miniGameResult = await saveMiniGameResult(userId, result, miniGameType);
        return miniGameResult;
    } catch (e) {
        throw e;
    }
};

export const getMiniGameResultData = async (userId: number, date: string): Promise<GetMiniGameType> => {
    try {
        console.log(date)
        const miniGameResult = await getMiniGame(userId, date);
        return miniGameResult;
    } catch (e) {
        throw e;
    }
}
