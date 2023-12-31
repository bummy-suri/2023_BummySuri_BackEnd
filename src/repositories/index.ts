import { createUser, getUserByCardAddress, getUser, deleteUser, updateUser } from "./users";
import { saveBetting, getBetting, updateBetting, saveGameResult, getGameResult, updateGameResult, totalEarnedPointResult, pointChange } from "./games";
import { getTop10UsersByTotalPoint, getUserRankingById } from "./ranking";
import { saveMiniGameResult, getMiniGame } from "./miniGames";
import { initNFTCount, getNFTCount, updateNFTCount, getMetaData, getAvailableTokenId, createIssuedRecord } from "./minting";
export {
  createUser as createUserPersistence,
  getUserByCardAddress as getUserByCardAddressPersistence,
  getUser as getUserPersistance,
  deleteUser as deleteUserUserPersistance,
  updateUser as updateUserPersistance
}
export{
  saveBetting as saveBettingPersistence,
  getBetting as getBettingPersistence,
  updateBetting as updateBettingPersistence,
  saveGameResult as saveGameResultPersistence,
  getGameResult as getGameResultPersistence,
  updateGameResult as updateGameResultPersistance,
  totalEarnedPointResult as totalEarnedPointsPersistance,
  saveMiniGameResult as saveMiniGameResultPersistance,
  getMiniGame as getMiniGamePersistance,
  getTop10UsersByTotalPoint as getTop10UsersByTotalPointPersistance,
  getUserRankingById as getUserRankingByIdPersistance,
  pointChange as pointChangePersistance
  
}

export{
  getNFTCount as getNFTCountPersistance,
  updateNFTCount as updateNFTCountPersistance,
  initNFTCount as initNFTCountPersistance,
  getMetaData as getMetaDataPersistance,
  getAvailableTokenId as getAvailableTokenIdPersistance,
  createIssuedRecord as createIssuedRecordPersistance

}