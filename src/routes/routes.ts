import { Router } from 'express';
import { 
    registerController, 
    getUserController, 
    deleteUserController,
    saveBettingController, 
    getBettingController,
    updateBettingController,
    checkBettingResultController,
    createGameController, 
    getGameResultController, 
    updateGameResultController,
    changeMiniGamePointsController,
    miniGameTimesController,
    getMiniGameTimesController,
    authenticateController
} from '../controllers';



export const authRouter = Router();

// User routes
// authRouter.post('/users', registerController);
authRouter.get('/users', getUserController);
authRouter.delete('/users', deleteUserController);

// Betting routes
authRouter.post('/betting/:gameType', saveBettingController);
authRouter.get('/betting/:gameType', getBettingController);
authRouter.put('/betting/:gameType', updateBettingController);

// BettingResult routes
authRouter.post('/bettingResult/:gameType', checkBettingResultController);

// Game routes
authRouter.post('/game/:gameType', createGameController);
authRouter.get('/game/:gameType', getGameResultController);
authRouter.put('/game/:gameType', updateGameResultController);

// MiniGame routes
authRouter.put('/minigame/points', changeMiniGamePointsController);
authRouter.put('/minigame/times', miniGameTimesController);
authRouter.get('/minigame/times', getMiniGameTimesController);



export const nonAuthRouter = Router();

nonAuthRouter.post('/user', authenticateController);