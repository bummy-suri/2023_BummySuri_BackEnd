export type TeamType = 'YONSEI' | 'KOREA';
export type gameType = 'baseball' | 'basketball' | 'hockey' | 'soccer' | 'rugby';

export type UserType = {
    userCardAddress: string;
    univ?: TeamType | null;
    totalPoint: number;
    isMinted: boolean;
    isTaken: boolean;
    pointDate: Date;
}

export interface UserTypeIncludeID extends UserType {
    id: number;
}

export type TokenType = {
    access: string;
    refresh?: string;
}

export type BettingRequest = {
    selected: boolean;
    playing: string;
    predictedWinner: string;
    predictedScore?: string | null;
    bettingPoint: string;
}

export type GameResult = {
    playing: string;
    KoreaScore: number;
    YonseiScore: number;
};

export type GameResultUpdate = {
    playing?: string;
    KoreaScore?: number;
    YonseiScore?: number;
};

//베팅 결과 확인
export type BettingResult = {
    success: boolean;
    earnedPoint: number;
    totalPoint: number;

}

export type BettingResultResponse = {
    success: boolean;
    earnedPoint: number;
    totalPoint: number;
    winner: string;
    difference: number;
}

export type TotalEarnedPoint = {
    totalPoint: number;   
    isTaken: boolean;
}

export type NFTCountType = {
    count: number;
}

export type MiniGameType = {
    miniGameType: string;
    quiz: boolean;
    times: number;
    totalPoint: number;
}

export type MiniGameResponse = {
    times: number;
    quiz: boolean;
    totalPoint: number;
}

export type UserRankingType = {
    userCardAddress: string;
    totalPoint: number;
  };
  
  export type UserRankingListType = UserRankingType[];