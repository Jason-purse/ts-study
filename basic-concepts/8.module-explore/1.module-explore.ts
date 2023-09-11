import HttpRequestClient from "./http-request-client";

const client = new HttpRequestClient()

// 不需要导入其他类型 ..(例如RequestConfig)
client.get({name: 'getHttpClient', method: 'post'})
