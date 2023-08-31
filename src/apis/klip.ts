import axios, { AxiosError } from "axios"
import { ZodError, z } from "zod"
import { ClientError, UnexpectedError } from "../utils/errors"


const handleApp2AppResultStateResponseSchema = z.object({
    request_key: z.string(),
    expiration_time: z.number(),
    status: z.enum(["prepared", "requested", "completed", "canceled", "error"]),
    result: z.object({
      klaytn_address: z.string()
    })
})


export const handleApp2AppResultState = async (requestKey: string) : Promise<string> => {

    let data: any

    return axios.get("https://a2a-api.klipwallet.com/v2/a2a/result", {
        params: {
            request_key: requestKey
        }
    }).then((res) => {
        data = res.data
        const response = handleApp2AppResultStateResponseSchema.parse(res.data)

        if (response.status != "completed") {
            throw new ClientError(`response status is ${response.status}, should be completed`)
        }

        return response.result.klaytn_address
    }).catch((error) => {
        if (error instanceof AxiosError && error.response?.status == 400) {
            throw new ClientError(JSON.stringify(error.response?.data))
        }

        if (error instanceof AxiosError && error.response?.status == 500) {
            throw error
        }

        if (error instanceof ZodError) {
            throw new ClientError(`schema error: ${JSON.stringify(error.errors)}, received: ${JSON.stringify(data)}`)
        }

        if (error instanceof ClientError) {
            throw error
        }

        //if (error instanceof ZodError) {
        //    throw new ClientError(`invalid response schema. type of request should be "Auth" `)
        //}

        throw new UnexpectedError(error)
    })
}