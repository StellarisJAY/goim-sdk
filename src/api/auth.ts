import request from '../util/request'
import { BaseResponse, LoginResponse, RegisterRequest } from './base'

export function login(account: string, password: string, deviceID: string): Promise<LoginResponse> {
    let data = {
        "account": account,
        "password": password,
        "deviceID": deviceID
    }
    return new Promise<LoginResponse>((resolve, reject)=>{
        request.post('/auth/login', data)
        .then(function(response){
            resolve({
                code: response.data.code,
                message: response.data.message,
                token: response.data.token
            } as LoginResponse)
        })
        .catch(function(err){
            reject(err)
        })
    })
}

export function register(regReq: RegisterRequest): Promise<BaseResponse> {
    return new Promise<BaseResponse>((resolve, reject)=>{
        request.post('/auth/register', regReq)
        .then(function(response){
            resolve({
                code: response.data.code,
                message: response.data.message
            } as BaseResponse)
        })
        .catch(function(err){

        })
    })
}