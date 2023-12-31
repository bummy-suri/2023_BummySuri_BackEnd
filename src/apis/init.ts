const CaverExtKAS = require("caver-js-ext-kas")

const CHAIN_ID = process.env.CHAIN_ID
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

const caver = new CaverExtKAS();
caver.initKASAPI(CHAIN_ID, ACCESS_KEY_ID, SECRET_ACCESS_KEY)

export const BUMMY_CONTRACT = process.env.BUMMY_CONTRACT || (() => { throw new Error('BUMMY_CONTRACT is not defined'); })();
export const SURI_CONTRACT  = process.env.SURI_CONTRACT  || (() => { throw new Error('SURI_CONTRACT is not defined'); })();
export const DEV_CONTRACT   = process.env.DEV_CONTRACT   || (() => { throw new Error('DEV_CONTRACT is not defined'); })();

export default caver;

