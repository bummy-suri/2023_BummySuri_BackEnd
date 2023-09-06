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
        console.log(await getContractList())
        //await createContract({ name: "2023DevContract",   alias: "dev-contract-2023",   symbol: "DEV" })
        //await createContract({ name: "2023BummyContract", alias: "bummy-contract-2023", symbol: "BUMMY" })
        //await createContract({ name: "2023SuriContract",  alias: "suri-contract-2023",  symbol: "SURI" })
    } catch (error) {
        console.log(error)
    }
}

main();

