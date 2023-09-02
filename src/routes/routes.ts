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
    saveMiniGameResultController,
    authenticateController,
    totalEarnedPointsController,
    getNFTCountController,
    getTop10RankingController,
    getUserRankingController
} from '../controllers';



export const authRouter = Router();

// User routes
//authRouter.post('/users', registerController);
authRouter.get('/users', getUserController);
authRouter.delete('/users', deleteUserController);

// Betting routes
authRouter.post('/betting/:gameType', saveBettingController);
authRouter.get('/betting/:gameType', getBettingController);
authRouter.put('/betting/:gameType', updateBettingController);

// BettingResult routes
authRouter.post('/bettingResult/:gameType', checkBettingResultController);
authRouter.put('/bettingResult', totalEarnedPointsController);

// Game routes
authRouter.post('/game/:gameType', createGameController);
authRouter.get('/game/:gameType', getGameResultController);
authRouter.put('/game/:gameType', updateGameResultController);

// MiniGame routes
authRouter.put('/minigame', saveMiniGameResultController);

//Mint routes
authRouter.get('/mint', getNFTCountController);

//Ranking routes
authRouter.get('/ranking/top10', getTop10RankingController);
authRouter.get('/ranking/user', getUserRankingController);

export const nonAuthRouter = Router();

nonAuthRouter.post('/users', authenticateController);
