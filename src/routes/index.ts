import express from 'express';

import sampleRouter from './user';

const PORT = process.env.PORT || (() => { throw new Error('PORT not defined'); })();

const app = express();

app.use('/example', sampleRouter);

const run = async () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

export default run;