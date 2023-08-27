import { register, getUser, deleteUser } from "./register";
export {
    register as registerController,
    getUser as getUserController,
    deleteUser as deleteUserController
 };

import { saveBetting, getBetting } from "./betting";
export {
    saveBetting as saveBettingController,
    getBetting as getBettingController
 };

import { checkBettingResult} from "./bettingResult";
export {
    checkBettingResult as checkBettingResultController
 };

import { createGameResult, getGameResult, updateGameResult } from "./game";
export {
    createGameResult as createGameController,
    getGameResult as getGameResultController,
    updateGameResult as updateGameResultController
 };

import { changeMiniGamePoints, miniGameTimes, getTimes } from "./miniGame";
export {
    changeMiniGamePoints as changeMiniGamePointsController,
    miniGameTimes as miniGameTimesController,
    getTimes as getMiniGameTimesController
 };