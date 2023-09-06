import sleep from "../utils/sleep";
import { caver } from "./init";













const issueToken = async () => {
    return await caver.kas.kip17.mint(
        "my-first-kip17", // contractAlias
        "0x32C6AC28C3B7534F75F16566FDE745E9e665E298", // to, 지갑 주소
        "0x0", // id, 토큰의 고유 번호, 사용자 id 를 사용하자
        "https://link.to.your/token/metadata-0x1.json" // url
    );
}