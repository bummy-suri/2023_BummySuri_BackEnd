import { NFTType } from "../models/sample";
import sleep from "../utils/sleep";
import { createToken } from "./atom";

// here are where the function external module calls exists

// mock function
export const acquireNFT = async ({team, tokenId, cardAddress}: NFTType) => {
    const contract = (team === 'KOREA' ? 'bummy-contract-2023' : 'suri-contract-2023')
    const metadataUrl = `https://metadata.bummysuri.com/${contract}/${tokenId}`
    const hexToken = '0x'+tokenId.toString(16);

    await createToken({contract, cardAddress, tokenId: hexToken, metadataUrl});
    await sleep(15000);
}
