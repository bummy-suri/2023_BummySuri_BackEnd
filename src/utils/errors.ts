import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";


const isErrorOfType = (error: Error, types: Function[]) : boolean => {
    return types.some(type => error instanceof type)
};


export const isErrorOfPrisma = (error: Error) : boolean => {
    return isErrorOfType(error, [PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError])
}

export class PrismaError extends Error {}