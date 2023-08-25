import express from 'express';
import { authenticateMiddleware } from './middlewares';
import { authRouter, nonAuthRouter } from './routes';


const PORT = process.env.PORT || (() => { throw new Error('PORT not defined'); })();

const app = express();

app.use(nonAuthRouter)
app.use(authenticateMiddleware);
app.use(authRouter);



const run = async () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

export default run;