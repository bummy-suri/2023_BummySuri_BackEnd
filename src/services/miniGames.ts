import {
    MiniGameResponse
} from "../models/sample";
import {
    saveMiniGameResult
} from "../repositories/miniGames";

export const saveMiniGameResultData = async (userId: number, result: string, miniGameType: string): Promise<MiniGameResponse> => {
    try {
        const miniGameResult = await saveMiniGameResult(userId, result, miniGameType);
        return miniGameResult;
    } catch (e) {
        throw e;
    }
};
