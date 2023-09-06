import { Router } from 'express';
import { 
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
    getUserRankingController,
    getMiniGameResultController
} from '../controllers';

export const nonAuthRouter = Router();

nonAuthRouter.post('/users', authenticateController);
nonAuthRouter.get('/metadata/:contract_addr/:token_id');

export const authRouter = Router();

// User routes
authRouter.get('/users', getUserController);
authRouter.delete('/users', deleteUserController);

export const mintedAuthRouter = Router();

// Betting routes
mintedAuthRouter.post('/betting/:gameType', saveBettingController);
mintedAuthRouter.get('/betting/:gameType', getBettingController);
mintedAuthRouter.put('/betting/:gameType', updateBettingController);

// BettingResult routes
mintedAuthRouter.get('/bettingResult/:gameType', checkBettingResultController);
mintedAuthRouter.put('/bettingResult', totalEarnedPointsController);

// Game routes
mintedAuthRouter.post('/game/:gameType', createGameController);
mintedAuthRouter.get('/game/:gameType', getGameResultController);
mintedAuthRouter.put('/game/:gameType', updateGameResultController);

// MiniGame routes
mintedAuthRouter.put('/minigame', saveMiniGameResultController);
mintedAuthRouter.get('/minigame', getMiniGameResultController);

//Mint routes
mintedAuthRouter.get('/mint', getNFTCountController);

//Ranking routes
mintedAuthRouter.get('/ranking/top10', getTop10RankingController);
mintedAuthRouter.get('/ranking/user', getUserRankingController);


