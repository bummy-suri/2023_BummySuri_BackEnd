import express from 'express';
import { authenticateMiddleware, mintAuthenticateMiddleware} from './middlewares';
import { authRouter, nonAuthRouter} from './routes';
import cors from 'cors';


const PORT = process.env.PORT || (() => { throw new Error('PORT not defined'); })();
const CORS_ALLOW_ORIGIN = process.env.CORS_ALLOW_ORIGIN || "";

const app = express();

app.use(express.json());

app.use(cors({
    origin: ['http://localhost:3000', CORS_ALLOW_ORIGIN],
    optionsSuccessStatus: 204,
    methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
}));

app.use(nonAuthRouter);
app.use(authenticateMiddleware);
app.use(authRouter);
app.use(mintAuthenticateMiddleware);
app.use(authRouter);

const run = async () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

export default run;