import { TeamType } from "@prisma/client";
import { NFTType } from "../models/sample";
import { createToken, getTokenList } from "./atom";
import { withTimeout } from "../utils/timeout";

// here are where the function external module calls exists

// mock function
export const acquireNFTIWithoutWait = async ({team, tokenId, cardAddress}: NFTType) => {
    const contract = (team === 'KOREA' ? 'bummy-contract-2023' : 'suri-contract-2023')
    const metadataUrl = `https://metadata.bummysuri.com/${contract}/${tokenId}`
    const hexToken = '0x'+tokenId.toString(16);

    try {
        console.log(`acquireNFTI: ${contract}, ${cardAddress}, ${tokenId}, ${metadataUrl}` )
        await createToken({contract, cardAddress, tokenId: hexToken, metadataUrl});
    } catch (e) {
        throw e;
    }

}


export const acquireNFT = async ({team, tokenId, cardAddress}: NFTType) => {
    try {
        await withTimeout(acquireNFTIWithoutWait, {team, tokenId, cardAddress}, 3000);
    } catch (e) {
        throw e;
    }
}







export const fetchMintedCount = async (team: TeamType) : Promise<number> =>  {
    const contract = (team === 'KOREA' ? 'bummy-contract-2023' : 'suri-contract-2023')
    const tokenList = await getTokenList({contract})

    if (tokenList === undefined || tokenList.items === undefined) {
        throw new Error('tokenList is undefined')
    }
    return tokenList.items.length;
}





/*
export const fetchTest = async (team: TeamType) : Promise<number> =>  {
    const contract = (team === 'KOREA' ? 'bummy-contract-2023' : 'suri-contract-2023')

    try {
        const response = await axios.post('https://api.cypress.klaytn.net:8651/', {
          jsonrpc: '2.0',
          id: 1,
          method: 'klay_call',
          params: [{
            to: contractAddress,
            data: data
          }, 'latest']
        });
    
        const totalSupply = parseInt(response.data.result, 16);
        console.log(`Total Supply: ${totalSupply}`);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
}*/