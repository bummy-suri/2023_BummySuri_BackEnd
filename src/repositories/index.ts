import { createUser, getUserByCardAddress, getUser, deleteUser } from "./users";
import { saveBetting, getBetting, updateBetting, saveGameResult, getGameResult, updateGameResult, totalEarnedPointResult, pointChange } from "./games";
import { getTop10UsersByTotalPoint, getUserRankingById } from "./ranking";
import { saveMiniGameResult } from "./miniGames";
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
  getUserRankingById as getUserRankingByIdPersistance,
  pointChange as pointChangePersistance
  
}
export{
  getNFTCount as getNFTCountPersistance
}