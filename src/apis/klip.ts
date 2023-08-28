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

    return axios.get("https://a2a-api.klipwallet.com/v2/a2a/result", {
        params: {
            request_key: requestKey
        }
    }).then((res) => {
        const response = handleApp2AppResultStateResponseSchema.parse(res.data)

        if (response.status != "completed") {
            throw new ClientError(`response status is ${response.status}`)
        }

        return response.result.klaytn_address
    }).catch((error) => {

        if (error instanceof ZodError || error instanceof ClientError) {
            throw error
        }

        if (error instanceof AxiosError) {
            throw new ClientError("invalid request key")
        }

        throw new UnexpectedError(error.message)
    })
}