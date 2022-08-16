import { MessageFlag } from "../proto/msg"

export interface BaseResponse {
    code: number
    message: string
}

export interface LoginResponse{
    code: number
    message: string
    token: string
}

export interface RegisterRequest {
    account: string
    nickName: string
    password: string
}

export interface SendMessageRequest {
    to: number
    content: string
    flag: number
}

export interface SendMessageResponse {
    code: number
    message: string
    messageId: number
    timestamp: number
}

export interface UserInfo {
    account: string
    nickName: string
    userID: number
    registerTime:number
}

export interface UserInfoResponse {
    code: number
    message: string
    userInfo: UserInfo
}

export interface FriendInfo {
    account: string
    nickName: string
    userID: number
    registerTime:number
    acceptTime: number
}

export interface FriendListResponse {
    code: number
    message: string
    friends: FriendInfo[]
}