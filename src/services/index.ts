import { mintUser, getUserData, deleteUserData } from "./register";
export {
    mintUser as mintUserService,
    getUserData as getUserService,
    deleteUserData as deleteUserDataService
};

import { saveBettingData, getBettingData, updateBettingData, saveGameResultData, getGameResultData, updateGameResultData, saveMiniGameResultData, checkBettingResultData, totalEarnedPointData } from "./games";
export {
    saveBettingData as saveBettingService,
    getBettingData as getBettingService,
    updateBettingData as updateBettingService,
    saveGameResultData as saveGameResultService,
    getGameResultData as getGameResultService,
    updateGameResultData as updateGameResultService,
    saveMiniGameResultData as saveMiniGameResultService,
    checkBettingResultData as checkBettingResultService,
    totalEarnedPointData as totalEarnedPointService
};

import { grantUser } from "./register";
export {
    grantUser as grantUserService
};