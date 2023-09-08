import { TeamType } from "@prisma/client";
import { MetaDataType, NFTCountType } from "../models/sample";
import {
  getUserPersistance,
  getNFTCountPersistance,
  updateNFTCountPersistance,
  updateUserPersistance,
  getMetaDataPersistance,
  getAvailableTokenIdPersistance,
  createIssuedRecordPersistance,
  initNFTCountPersistance,
} from "../repositories";
import { generateToken } from "./auth";
import { acquireNFT, fetchMintedCount } from "../apis/kas";
import { BUMMY_CONTRACT, SURI_CONTRACT } from "../apis/init";

export const initNFTCoount = async () => {
    try {
        await initNFTCountPersistance('KOREA', await fetchMintedCount('KOREA'));
        await initNFTCountPersistance('YONSEI', await fetchMintedCount('YONSEI'));
    } catch (e) {
        throw e;
    }
}


export const getNFTCountData = async (
  team: TeamType
): Promise<NFTCountType> => {
  try {
    const NFTCountData = await getNFTCountPersistance(team);

    if (!NFTCountData) {
      throw new Error(`NFTCountData not found for team ${team}`);
    }

    return NFTCountData;
  } catch (e) {
    throw e;
  }
};

export const minting = async (
  userid: number,
  team: TeamType
): Promise<number | boolean> => {
  try {
    let contractAddr = BUMMY_CONTRACT;

    if (team === "KOREA") {
      contractAddr = BUMMY_CONTRACT;
    } else if (team === "YONSEI") {
      contractAddr = SURI_CONTRACT;
    }

    if (!contractAddr) {
        console.log(`contractAddr not found for team ${team}`);
      throw new Error(`contractAddr not found for team ${team}`);
    }

    //check the count
    const countData = await getNFTCountPersistance(team);
    if (!countData) {
        console.log(`NFTCountData not found for team ${team}`);
      throw new Error(`NFTCountData not found for team ${team}`);
    } else {
      if (countData.count >= 5000) {
        console.log(`NFTCountData is over 5000 for team ${team}`);
        throw new Error(`NFTCountData is over 5000 for team ${team}`);
      }

      let userData = await getUserPersistance(userid);
      if (!userData) {
        console.log(`userData not found for user ${userid}`);
        throw new Error(`userCardAddress not found for user ${userid}`);
      }

      const userCardAddress = userData.userCardAddress;

      //isMinted check
      if (userData.isMinted === true) {
        return false;
      }


      let userTokenId = 0;
      for (var i=0; i<5; i++) {

        try {
            userTokenId = await getAvailableTokenIdPersistance(contractAddr);
            if (!userTokenId) {
                console.log(`AvailableTokenId not found`);
                throw new Error(`AvailableTokenId not found`);
            }

            if (userCardAddress == "bummy-contract-2023") {
                userTokenId += 50;
            }

            await acquireNFT({
                team,
                tokenId: userTokenId,
                cardAddress: userCardAddress,
            });

            break;

        } catch (e) {
            console.log(e)
            if (i == 4) {
                throw e;
            }            
        }
      }

      //issuedRecord
      await createIssuedRecordPersistance(userid, userTokenId, contractAddr);

      //update the user isMinted to true
      userData = await updateUserPersistance(userid, team, true);

      //update the NFTcount
      const updatedCountData = await updateNFTCountPersistance(team);

      //generate accessToken
      const token = parseInt(generateToken(userid, true));
      return token;
    }
  } catch (e) {
    console.log(e)
    throw e;
  }
};

export const privateMint = async (userid: number, tokenId: number, team: TeamType) => {
    try {
        const user = await getUserPersistance(userid);
        const accountAddr = user.userCardAddress;
        const contract = (team === 'KOREA' ? 'bummy-contract-2023' : 'suri-contract-2023')

        console.log(`privateMint: ${userid}, ${tokenId}, ${team}, ${accountAddr}`)

        if (team === "KOREA" && tokenId % 2 == 1) {
            throw new Error(`tokenId is not valid for team ${team}`);
        }
        if (team === "YONSEI" && tokenId % 2 == 0) {
            throw new Error(`tokenId is not valid for team ${team}`);
        }

        await acquireNFT({team, tokenId, cardAddress: accountAddr});

        await createIssuedRecordPersistance(userid, tokenId, contract);
        
    } catch (e) {
        throw e;
    }
}

export const getMetaData = async (
  contractAddr: string,
  tokenId: number
): Promise<MetaDataType> => {
  const tokenData = await getMetaDataPersistance(contractAddr, tokenId);

  const attributes = tokenData.attributes.map((attr) => ({
    trait_type: attr.key,
    value: attr.value,
  }));

  let group_name = "";
  let group_icon = "";

  if (contractAddr === BUMMY_CONTRACT) {
    group_name = "버미";
    group_icon = "https://static.bummysuri.com/asset/bummy_badge.png";
  } else if (contractAddr === SURI_CONTRACT) {
    group_name = "수리";
    group_icon = "https://static.bummysuri.com/asset/suri_badge.png";
  }

  return {
    image:
      "https://static.bummysuri.com/asset/" +
      contractAddr +
      "/" +
      tokenData.image,
    group_name: group_name,
    group_icon: group_icon,
    attributes: attributes,
  };
};
