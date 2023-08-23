require('dotenv').config();

import run from './src/routes';

run().catch(console.error);