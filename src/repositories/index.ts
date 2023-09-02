import { createUser, getUserByCardAddress, getUser, deleteUser } from "./users";
import { saveBetting, getBetting, updateBetting, saveGameResult, getGameResult, updateGameResult, saveMiniGameResult, totalEarnedPointResult, getTop10UsersByTotalPoint, getUserRankingById } from "./games";
import { getNFTCount } from "./mint";
export {
  createUser as createUserPersistence,
  getUserByCardAddress as getUserByCardAddressPersistence,
  getUser as getUserPersistance,
  deleteUser as deleteUserUserPersistance,
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
  getTop10UsersByTotalPoint as getTop10UsersByTotalPointPersistance,
  getUserRankingById as getUserRankingByIdPersistance
  
}
export{
  getNFTCount as getNFTCountPersistance
}