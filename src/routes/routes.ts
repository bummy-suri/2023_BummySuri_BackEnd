import { Router } from 'express';
import { 
    registerController, 
    getUserController, 
    deleteUserController,
    saveBettingController, 
    getBettingController,
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
authRouter.post('/user', registerController);
authRouter.get('/user/:userid', getUserController);
authRouter.delete('/user/:userid', deleteUserController);

// Betting routes
authRouter.post('/betting/:gameType', saveBettingController);
authRouter.get('/betting/:gameType', getBettingController);

// BettingResult routes
authRouter.post('/bettingResult/:gameType', checkBettingResultController);

// Game routes
authRouter.post('/game/:gameType', createGameController);
authRouter.get('/game/:gameType', getGameResultController);
authRouter.put('/game/:gameType', updateGameResultController);

// MiniGame routes
authRouter.post('/minigame/:points', changeMiniGamePointsController);
authRouter.post('/minigame/:times', miniGameTimesController);
authRouter.get('/minigame/:times', getMiniGameTimesController);



export const nonAuthRouter = Router();

nonAuthRouter.post('/user', authenticateController);