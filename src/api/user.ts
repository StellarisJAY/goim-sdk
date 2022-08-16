import request from "../util/request";
import { UserInfo, UserInfoResponse } from "./base";

export function getUserInfo(userID: number): Promise<UserInfoResponse> {
    return new Promise<UserInfoResponse>((resolve, reject)=>{
        if (!userID) {
            reject(new Error('missing userID for getUserInfo api'))
            return
        }
        request.get('/user/' + userID)
        .then(response=>{
            resolve({
                code: response.data.code,
                message: response.data.message,
                userInfo: response.data.userInfo as UserInfo
            } as UserInfoResponse)
        })
        .catch(err=>{
            reject(err)
        })
    })
}

export function getUserByAccount(account: string): Promise<UserInfoResponse> {
    return new Promise<UserInfoResponse>((resolve, reject)=>{
        if (account || account == '') {
            reject(new Error('missing account argument for getUserByAccount api'))
            return
        }
        resolve({} as UserInfoResponse)
    })
}

