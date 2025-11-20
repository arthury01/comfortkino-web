import { userStore } from "../store/userStore";

type Request<T> = { status: "success"; data: T } | { status: "error"; error: { message: string } }

export const useRequest = () => {
    const { user } = userStore()

    const requestData = async <T = any>({
        type,
        path,
        sendData,
        disableError = false,
        disableVersion = false
    }: {
        type: "GET" | "POST" | "PUT" | "DELETE"
        path: string
        sendData?: Record<string, any>
        disableError?: boolean
        disableVersion?: boolean
    }): Promise<Request<T>> => {
        const token = user?.token ?? null
        
        const serverUrl = "https://api.comfortkino.ru/app/"
        const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : `node/${process.version}`

        const headers: HeadersInit = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "User-Agent": userAgent
        }

        if (!disableVersion) headers["version"] = "2"
        if (token) headers["Authorization"] = `Bearer ${token}`

        const options: RequestInit = {
            method: type,
            headers
        }

        if (sendData) options.body = JSON.stringify(sendData)

        const res = await fetch(serverUrl + path, options)
        const json: Request<T> = await res.json()

        if (json.status === "error" && !disableError) {
            alert(json.error.message)
        }

        return json
    }

    const request = async <T = any>(
        type: "GET" | "POST" | "PUT" | "DELETE",
        path: string,
        sendData?: Record<string, any>,
        disableVersion?: boolean
    ): Promise<T> => {
        const res = await requestData<T>({ type, path, sendData, disableVersion })
        // console.log(path, ...(sendData != null ? [sendData] : []), res)
        if (res.status === "error") {
            throw new Error(res.error.message)
        }
        return res.data
    }

    return { requestData, request }
}
