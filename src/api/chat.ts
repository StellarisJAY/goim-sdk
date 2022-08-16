import { SendMessageRequest, SendMessageResponse } from "./base";
import request from '../util/request'

export function sendMessage(sendReq: SendMessageRequest): Promise<SendMessageResponse> {
    return new Promise<SendMessageResponse>((resolve, reject)=>{
        if (sendReq.content != null && sendReq.content != '') {
            reject(new Error('message content can not be empty'))
            return
        }
        request.post('/chat/send', sendReq)
        .then(response=>{
            resolve({
                code: response.data.code,
                message: response.data.message,
                messageId: response.data.messageId,
                timestamp: response.data.timestamp
            } as SendMessageResponse)
        })
        .catch(err=>{
            reject(err)
        })
    })
}
