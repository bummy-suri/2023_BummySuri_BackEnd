require('dotenv').config();

import { createContract, createToken, createWallet, getContractList } from "./src/apis/atom"
import caver from "./src/apis/init";
import { acquireNFT } from "./src/apis/kas";
import sleep from "./src/utils/sleep";

// KASKLL5HLB44QZCE0KZPWVQZ

// 5PB7tu1i_nkSnhFGQIjziymsqURyDMA8peOtSFRC

// Basic S0FTS0xMNUhMQjQ0UVpDRTBLWlBXVlFaOjVQQjd0dTFpX25rU25oRkdRSWp6aXltc3FVUnlETUE4cGVPdFNGUkM=

//getContractList()
//.then((res) => {
//    console.log(res)
//}).catch((err) => {
//    console.log(err)
//})


/*
const main = async () => {
    try {
        const result = await caver.kas.kip17.getTokenList("suri-contract-2023");
        console.log(result.items.length)
    } catch (e) {
        console.log(e)
    }
*/

const main = async () => {
    const contract = "suri-contract-2023"
    const cardAddress = "0x07A2ce3cADBb0051Ae5bCD0B1F17e1B1D4c59d7f" // gyumin
    const num = 4
    const tokenId = '0x'+num.toString(16)
    const metadataUrl = "https://metadata.bummysuri.com/suri-contract-2023/4443"

    try {
        //await createContract({ name: "2023DevContract",   alias: "dev-contract-2023",   symbol: "DEV" })
        //await createContract({ name: "2023BummyContract", alias: "bummy-contract-2023", symbol: "BUMMY" })
        //await createContract({ name: "2023SuriContract",  alias: "suri-contract-2023",  symbol: "SURI" })
        //await sleep(15000)
        //console.log(await getContractList())

        //console.log(await createToken({ contract, cardAddress, tokenId, metadataUrl}))

        console.log(await acquireNFT({team: 'KOREA', tokenId: num, cardAddress: cardAddress}))

    } catch (error) {
        console.log(error)
    }
}

main();


// ContractList

//console.log(await getContractList())



