export type TeamType = 'YONSEI' | 'KOREA';


export type UserType = {
    userCardAddress: string;
    univ?: TeamType | null;
    totalPoint: number;
    isMinted: boolean;
}

export type UserTypeIncludeID = UserType & {
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
    predictedScore: string;
    bettingPoint: number;
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
export type BettingResultResponse = {
    success: boolean;
    earnedPoint: number;
    totalPoint: number;
}

export type totalEarnedPoint = {
    totalPoint: number;   
    isTaken: boolean;
}

export type NFTCountType = {
    KoreaCount: number;
    YonseiCount: number;
}