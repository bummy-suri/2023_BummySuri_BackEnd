import { Router } from 'express';

import { registerController } from '../controllers';

const sampleRouter = Router();

sampleRouter.get('/user', registerController);

export default sampleRouter;