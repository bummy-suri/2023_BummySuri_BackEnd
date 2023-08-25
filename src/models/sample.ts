export type TeamType = 'YONSEI' | 'KOREA';



export type UserType = {
    userCardAddress: string;
    name: string;
    univ: TeamType;
    phone: string;
    studentId: string;
}

export type TokenType = {
    access: string;
    refresh?: string;
}