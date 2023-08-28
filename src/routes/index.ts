import express from 'express';
import { authenticateMiddleware } from './middlewares';
import { authRouter, nonAuthRouter } from './routes';
import cors from 'cors';


const PORT = process.env.PORT || (() => { throw new Error('PORT not defined'); })();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 204,
    methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
}));

app.use(nonAuthRouter)
app.use(authenticateMiddleware);
app.use(authRouter);

const run = async () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

export default run;