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