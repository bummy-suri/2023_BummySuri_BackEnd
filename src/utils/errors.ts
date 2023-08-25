import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";


const isErrorOfType = (error: any, types: Function[]) : boolean => {
    return types.some(type => error instanceof type)
};


export const isErrorOfPrisma = (error: any) : boolean => {
    return isErrorOfType(error, [PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError])
}

export class PrismaError extends Error {}