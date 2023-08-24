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
    changeMiniGamePointsController
} from '../controllers';

const sampleRouter = Router();

// User routes
sampleRouter.post('/user', registerController);
sampleRouter.get('/user', getUserController);
sampleRouter.delete('/user', deleteUserController);

// Betting routes
sampleRouter.post('/betting/:gameType', saveBettingController);
sampleRouter.get('/betting/:gameType', getBettingController);

// BettingResult routes
sampleRouter.get('/bettingResult/:gameType', checkBettingResultController);

// Game routes
sampleRouter.post('/game/:gameType', createGameController);
sampleRouter.get('/game/:gameType', getGameResultController);
sampleRouter.put('/game/:gameType', updateGameResultController);

// MiniGame routes
sampleRouter.post('/minigame', changeMiniGamePointsController);

export default sampleRouter;