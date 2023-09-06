import { caver } from "./init";


// no need to use
export const createWallet = async () => {
    return await caver.kas.wallet.createAccount();
}

// no need to use
export const getWalletList = async () => {
    return await caver.kas.wallet.getAccountList();
}



type CreateContract = {
    name:   string
    symbol: string
    alias:  string
}

// only use when it is not created
export const createContract = async ({name, symbol, alias}: CreateContract) => {
    return await caver.kas.kip17.deploy(name, symbol, alias);
}

export const getContractList = async () => {
    return await caver.kas.kip17.getContractList();
}



type CreateToken = {
    contract:    string
    cardAddress: string
    tokenId:     string
    metadataUrl: string
}

export const createToken = async ({contract, cardAddress, tokenId, metadataUrl}: CreateToken) => {
    return await caver.kas.kip17.mint(contract, cardAddress, tokenId, metadataUrl);
}

type GetTokenList = {
    contract: string
}

export const getTokenList = async ({contract}: GetTokenList) => {
    return await caver.kas.kip17.getTokenList(contract);
}