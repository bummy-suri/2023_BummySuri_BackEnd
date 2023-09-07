require('dotenv').config();

import { createContract, createToken, createWallet, getContractList } from "./src/apis/atom"
import caver from "./src/apis/init";
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



const main = async () => {

    const contract = "dev-contract-2023"
    const cardAddress = "0x07A2ce3cADBb0051Ae5bCD0B1F17e1B1D4c59d7f" // gyumin
    const num = 1
    const tokenId = '0x'+num.toString(16)
    const metadataUrl = "https://api.dev.bummysuri.com/metadata/bummy-contract-2023/1"

    try {
        //await createContract({ name: "2023DevContract",   alias: "dev-contract-2023",   symbol: "DEV" })
        //await createContract({ name: "2023BummyContract", alias: "bummy-contract-2023", symbol: "BUMMY" })
        //await createContract({ name: "2023SuriContract",  alias: "suri-contract-2023",  symbol: "SURI" })
        //await sleep(15000)
        //console.log(await getContractList())

        console.log(await createToken({ contract, cardAddress, tokenId, metadataUrl}))



        //const transactionHash = '0xf75700aeadf9eb4b6f317b148d8d4bcc89d68ae24a70f0efd6fabc8bf3f43dad'
        //console.log(await caver.kas.wallet.getTransaction(transactionHash));
        // console.log(await createToken({ contract, cardAddress, tokenId, metadataUrl: url}))



    } catch (error) {
        console.log(error)
    }
}

main();


// ContractList

//console.log(await getContractList())



