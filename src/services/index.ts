import { mintUser, getUserData, deleteUserData } from "./register";
export {
    mintUser as mintUserService,
    getUserData as getUserService,
    deleteUserData as deleteUserDataService
};

import { saveBettingData, getBettingData, updateBettingData, saveGameResultData, getGameResultData, updateGameResultData, checkBettingResultData, totalEarnedPointData} from "./games";
import {getTop10Rankings, getUserRanking } from "./ranking";
import { saveMiniGameResultData, getMiniGameResultData } from "./miniGames";
export {
    saveBettingData as saveBettingService,
    getBettingData as getBettingService,
    updateBettingData as updateBettingService,
    saveGameResultData as saveGameResultService,
    getGameResultData as getGameResultService,
    updateGameResultData as updateGameResultService,
    saveMiniGameResultData as saveMiniGameResultService,
    getMiniGameResultData as getMiniGameResultService,
    checkBettingResultData as checkBettingResultService,
    totalEarnedPointData as totalEarnedPointService,
    getTop10Rankings as getTop10RankingsService,
    getUserRanking as getUserRankingService
};

import { grantUser } from "./register";
export {
    grantUser as grantUserService
};

import { getNFTCountData, minting, getMetaData} from "./minting";
export {
    getNFTCountData as getNFTCountService,
    minting as mintingService,
    getMetaData as getMetaDataService,
};