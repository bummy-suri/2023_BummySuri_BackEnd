import { createUser, getUser, deleteUser } from "./users";
import { saveBetting, getBetting, saveGameResult, getGameResult, updateGameResult, saveMiniGameTimes, getTimes, saveMiniGamePoint } from "./games";

export {
  createUser as createUserPersistence,
  getUser as getUserPersistance,
  deleteUser as deleteUserUserPersistance,
}
export{
  saveBetting as saveBettingPersistence,
  getBetting as getBettingPersistence,
  saveGameResult as saveGameResultPersistence,
  getGameResult as getGameResultPersistence,
  updateGameResult as updateGameResultPersistance,
  saveMiniGameTimes as saveMiniGameTimesPersistence,
  getTimes as getTimesPersistence,
  saveMiniGamePoint as saveMiniGamePointPersistence
}