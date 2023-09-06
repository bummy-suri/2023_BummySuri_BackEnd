import { NFTType } from "../models/sample";
import sleep from "../utils/sleep";



export const acquireNFT = async ({team, tokenId, cardAddress}: NFTType) => {
    await sleep(5000);
}

