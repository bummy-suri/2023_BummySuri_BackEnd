export type TeamType = 'YONSEI' | 'KOREA';

export type UserType = {
    id: number;
    userCardAddress: string;
    name: string;
    univ: TeamType;
    phone: string;
    studentId: string;
    NFT_image?: string | null;
    totalPoint: number;
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

export type BettingResponse = {
    success: boolean;
    earnedPoint: number;
    totalPoint: number;
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