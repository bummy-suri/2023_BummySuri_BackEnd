require('dotenv').config();

import { createContract, getContractList } from "./src/apis/atom"

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

    try {
        await createContract({ name: "2023DevContract",   alias: "2023-dev-contract",   symbol: "DEV" })
        await createContract({ name: "2023BummyContract", alias: "2023-bummy-contract", symbol: "BUMMY" })
        await createContract({ name: "2023SuriContract",  alias: "2023-suri-contract",  symbol: "SURI" })
    } catch (error) {
        console.log(error)        
    }
}

main();

