import { mintUser, getUserData, deleteUserData } from "./register";
export {
    mintUser as mintUserService,
    getUserData as getUserService,
    deleteUserData as deleteUserDataService
};

import { saveBettingData, getBettingData,updateBettingData, saveGameResultData, getGameResultData, updateGameResultData, saveMiniGameTimesData,getTimesData ,saveMiniGamePointData, checkBettingResultData } from "./games";
export {
    saveBettingData as saveBettingSerVice,
    getBettingData as getBettingService,
    updateBettingData as updateBettingService,
    saveGameResultData as saveGameResultService,
    getGameResultData as getGameResultService,
    updateGameResultData as updateGameResultService,
    saveMiniGamePointData as saveMiniGamePointService,
    saveMiniGameTimesData as saveMiniGameTimesService,
    getTimesData as getTimesService,
    checkBettingResultData as checkBettingResultService
};

import { grantUser } from "./register";
export {
    grantUser as grantUserService
};