import { FriendInfo, FriendListResponse } from "./base";
import request from '../util/request'

export function listFriends(): Promise<FriendListResponse> {
    return new Promise<FriendListResponse>((resolve, reject)=>{
        request.get('/friend/list')
        .then((response)=>{
            resolve({
                code: response.data.code,
                message: response.data.message,
                friends: response.data.friends as FriendInfo[]
            } as FriendListResponse)
        })
        .catch(err=>{

        })               
    })
}