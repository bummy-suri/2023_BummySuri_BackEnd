import { TeamType } from "@prisma/client";
import { NFTType } from "../models/sample";
import sleep from "../utils/sleep";
import { createToken, getTokenList } from "./atom";
import { number } from "zod";

// here are where the function external module calls exists

// mock function
export const acquireNFT = async ({team, tokenId, cardAddress}: NFTType) => {
    const contract = (team === 'KOREA' ? 'bummy-contract-2023' : 'suri-contract-2023')
    const metadataUrl = `https://metadata.bummysuri.com/${contract}/${tokenId}`
    const hexToken = '0x'+tokenId.toString(16);

    await createToken({contract, cardAddress, tokenId: hexToken, metadataUrl});
}


export const aquireNFTI = async ({team, tokenId, cardAddress}: NFTType) => {
    //withTimeout(10000, acquireNFT({team, tokenId, cardAddress}));
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