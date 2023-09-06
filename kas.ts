require('dotenv').config();

import { getContractList } from "./src/apis/atom"

// KASKLL5HLB44QZCE0KZPWVQZ

// 5PB7tu1i_nkSnhFGQIjziymsqURyDMA8peOtSFRC

// Basic S0FTS0xMNUhMQjQ0UVpDRTBLWlBXVlFaOjVQQjd0dTFpX25rU25oRkdRSWp6aXltc3FVUnlETUE4cGVPdFNGUkM=

getContractList()
.then((res) => {
    console.log(res)
}).catch((err) => {
    console.log(err)
})



    /*
const main = async () => {

    try {
        console.log(await getContractList())
    } catch (error) {
        console.log(error)        
    }
}

main();
*/
