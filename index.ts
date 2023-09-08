require('dotenv').config();

import run from './src/routes';
import { initNFTCoount } from './src/services/minting';

initNFTCoount();

run().catch(console.error);