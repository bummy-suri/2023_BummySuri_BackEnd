import { authenticate, getUser, deleteUser  } from "./user";
export {
    authenticate as authenticateController,
    getUser as getUserController,
    deleteUser as deleteUserController
 };

import { saveBetting, getBetting, updateBetting} from "./betting";
export {
    saveBetting as saveBettingController,
    getBetting as getBettingController,
    updateBetting as updateBettingController,
    };

import { getTop10Ranking, getUserRanking } from "./ranking";
export {
    getTop10Ranking as getTop10RankingController,
    getUserRanking as getUserRankingController
};

import { checkBettingResult, totalEarnedPoints} from "./bettingResult";
export {
    checkBettingResult as checkBettingResultController,
    totalEarnedPoints as totalEarnedPointsController
 };

import { createGameResult, getGameResult, updateGameResult } from "./game";
export {
    createGameResult as createGameController,
    getGameResult as getGameResultController,
    updateGameResult as updateGameResultController
 };

import { saveMiniGameResult, getMiniGame } from "./miniGame";
export {
    saveMiniGameResult as saveMiniGameResultController,
    getMiniGame as getMiniGameResultController
 };

 import { getNFTCount, saveNFTData, getMetaData, minting } from "./minting";
 export {
        getNFTCount as getNFTCountController,
        minting as mintingController,
        saveNFTData as saveNFTDataController,
        getMetaData as getMetaDataController

};