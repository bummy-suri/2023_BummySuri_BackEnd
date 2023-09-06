import { NFTType } from "../models/sample";
import sleep from "../utils/sleep";

// here are where the function external module calls exists

// mock function
export const acquireNFT = async ({team, tokenId, cardAddress}: NFTType) => {
    await sleep(5000);
}

// real function
export const acquireNFTREAL = async ({team, tokenId, cardAddress}: NFTType) => {
    await sleep(5000);
}

