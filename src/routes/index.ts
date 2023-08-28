import express from 'express';
import { authenticateMiddleware } from './middlewares';
import { authRouter, nonAuthRouter } from './routes';
import cors from 'cors';


const PORT = process.env.PORT || (() => { throw new Error('PORT not defined'); })();

const app = express();

app.use(express.json());

const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || (() => { throw new Error('ALLOW_ORIGIN not defined'); })();

app.use(cors({
    origin: ['http://localhost:3000', ALLOW_ORIGIN],
    optionsSuccessStatus: 204,
    methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
}));

app.use(nonAuthRouter)
app.use(authRouter);
app.use(authenticateMiddleware);

const run = async () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

export default run;