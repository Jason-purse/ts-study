type ClientConfig = {}

type RequestConfig = {
    name: string,
    method: string
}
export default class HttpRequestClient {
    constructor() {

    }

    get<T>(config: RequestConfig): Promise<T | null> {
        return new Promise(resolve => {
            resolve(null)
        })
    }
}