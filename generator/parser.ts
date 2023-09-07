import { z } from 'zod';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import { BUMMY_CONTRACT } from '../src/apis/init';



const jsonSchema =
z.array(z.object({
    name: z.string(),
    image: z.string(),
    attributes: z.array(z.object({
        trait_type: z.string(),
        value: z.string(),
    }))
}));


  
type TokenMeta = {
    tokenId: number;
    image: string;
    attributes: {
        trait_type: string;
        value: string;
    }[]
}

const prisma = new PrismaClient();



export const reader = async () => {
    try {
        const data = fs.readFileSync('./metadata.bummy.json', 'utf8');
        const jsonData = JSON.parse(data);
        const parsedData = jsonSchema.parse(jsonData.collection);
        const processedData = parsedData.map((item): TokenMeta => {
            return {
                tokenId: Number(item.name)*2-1,
                image: item.image,
                attributes: item.attributes
            }
        })

        for (let idx = 752; idx < processedData.length; idx++) {
            let item = processedData[idx];

            console.log(`processing ${idx}th item`)
            await prisma.token.create({
                data: {
                    id: item.tokenId,
                    contractAddr: BUMMY_CONTRACT,
                    image: item.image,
                    owned: false,
                }
            })
            await prisma.attribute.createMany({
                data: item.attributes.map((attribute) => {
                    return {
                        tokenid: item.tokenId,
                        key: attribute.trait_type,
                        value: attribute.value
                    }
                }),
                skipDuplicates: true
            })
        }

        /*
        const item = processedData[0];
        await prisma.token.create({
            data: {
                id: item.tokenId,
                contractAddr: BUMMY_CONTRACT,
                image: item.image,
                owned: false,
            }
        })
        await prisma.attribute.createMany({
            data: item.attributes.map((attribute) => {
                return {
                    tokenid: item.tokenId,
                    key: attribute.trait_type,
                    value: attribute.value
                }
            }),
            skipDuplicates: true
        })
*/
/*
        processedData.map(async (item, idx) => {
            console.log(`processing ${idx}th item`)
            await prisma.token.create({
                data: {
                    id: item.tokenId,
                    contractAddr: BUMMY_CONTRACT,
                    image: item.image,
                    owned: false,
                }
            })
            await sleep(100)
        })
*/
        /*
        processedData.map(async (item) => {
            await prisma.token.create({
                data: {
                    id: item.tokenId,
                    contractAddr: BUMMY_CONTRACT,
                    image: item.image,
                    owned: false,
                }
            })
            await prisma.attribute.createMany({
                data: item.attributes.map((attribute) => {
                    return {
                        tokenid: item.tokenId,
                        key: attribute.trait_type,
                        value: attribute.value
                    }
                }),
                skipDuplicates: true
            })
        })
*/
    } catch (e) {
        console.log(e)
    }
}



