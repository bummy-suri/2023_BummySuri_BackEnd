import { register, getUser, deleteUser } from "./register";
export {
    register as registerController,
    getUser as getUserController,
    deleteUser as deleteUserController
 };

import { authenticate } from "./user";
export {
    authenticate as authenticateController
 };

import { saveBetting, getBetting, updateBetting } from "./betting";
export {
    saveBetting as saveBettingController,
    getBetting as getBettingController,
    updateBetting as updateBettingController
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

import { saveMiniGameResultController } from "./miniGame";
export {
    saveMiniGameResultController as saveMiniGameResultController
 };