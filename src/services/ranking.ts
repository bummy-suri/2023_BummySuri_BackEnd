import {
    getTop10UsersByTotalPoint,
    getUserRankingById
} from "../repositories/ranking";


//랭킹 조회
export const getTop10Rankings = async () => {
    try {
        const result = await getTop10UsersByTotalPoint();
        return result;
    } catch (e) {
        throw e;
    }
  };
  
  export const getUserRanking = async (userId: number) => {
    try{
        const result = await getUserRankingById(userId);
        return result;
    } catch (e) {
        throw e;
    }
  };