import { mintUser, getUserData, deleteUserData } from "./register";
export {
    mintUser as mintUserService,
    getUserData as getUserService,
    deleteUserData as deleteUserDataService
};

import { saveBettingData, getBettingData, saveGameResultData, getGameResultData, updateGameResultData, saveMiniGamePointData, checkBettingResult } from "./games";
export {
    saveBettingData as saveBettingSerVice,
    getBettingData as getBettingService,
    saveGameResultData as saveGameResultService,
    getGameResultData as getGameResultService,
    updateGameResultData as updateGameResultService,
    saveMiniGamePointData as saveMiniGamePointService,
    checkBettingResult as checkBettingResultService
};