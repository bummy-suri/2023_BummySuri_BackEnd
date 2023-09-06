const CaverExtKAS = require("caver-js-ext-kas")

const CHAIN_ID = process.env.CHAIN_ID;
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

const caver = new CaverExtKAS();
caver.initKASAPI(CHAIN_ID, ACCESS_KEY_ID, SECRET_ACCESS_KEY)

export { caver };

