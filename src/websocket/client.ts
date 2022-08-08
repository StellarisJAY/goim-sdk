import { HandshakeRequest, HandshakeResponse, HandshakeStatus } from '../proto/client';
import { setTimeout } from 'timers/promises';
import {w3cwebsocket, IMessageEvent} from 'websocket'
import { BaseMsg } from '../proto/msg';

export enum ClientStatus {
    New = "new",
    Connecting = "connecting",
    Logined = "logined",
    ConnectError = "error",
    Closed = "closed",
    AccessDenied = "access_denied",
}

export class IMClient {
    private wsAddress: string;
    private userToken: string
    private conn?: w3cwebsocket
    private lastRead?: number
    private status: ClientStatus
    
    constructor(token: string, url: string) {
        this.wsAddress = url
        this.userToken = token
        this.status = ClientStatus.New
    }

    // 设备登录
    async login(): Promise<{status:ClientStatus}> {
        if (this.status == ClientStatus.Logined) {
            return {status: this.status}
        }
        this.status = ClientStatus.Connecting
        // 建立ws连接
        let {status, conn} = await connect(this.wsAddress)
        if (status != Status.Connected) {
            return {status: ClientStatus.ConnectError}
        }
        this.conn = conn
        // 发送登录握手包
        let handshakeState = await this.doHandshake()
        if (!handshakeState) {
            return {status: ClientStatus.AccessDenied}
        }
        console.info("login succeed")
        // onMessage 
        conn.onmessage = (event: IMessageEvent)=>{
            try{
                this.lastRead = Date.now()
                let buffer = <ArrayBuffer>event.data
                let data = new Uint8Array(buffer)
                let message = BaseMsg.decode(data)
                console.info("received message: " + message.content)

            }catch(error) {
                console.error("read message error: ", error)
            }
        }

        // 服务端关闭连接
        conn.onclose = ()=>{
            console.info("websocket connection closed by remote server")
            this.status = ClientStatus.Closed
        }

        return {status:ClientStatus.Logined}
    }

    private async doHandshake(): Promise<{status:boolean}> {
        if (this.conn == null) {
            return {status:false}
        }
        const conn = this.conn
        return new Promise<{status:boolean}>((resolve, rejects)=>{
            let request = {token:this.userToken} as HandshakeRequest
            let data = HandshakeRequest.encode(request).finish()
            if(!this.sendData(data)) {
                resolve({status:false})
            }
            conn.onmessage = (event: IMessageEvent) => {
                let buffer = <ArrayBuffer>event.data
                let data = new Uint8Array(buffer)
                let response = HandshakeResponse.decode(data)
                resolve({status:response.status == HandshakeStatus.Success})
            }
        })
    }

    private sendData(data: Uint8Array | ArrayBuffer): boolean {
        try{
            if(this.conn == null) {
                return false
            }
            this.conn.send(data)
            return true
        }catch(err) {
            console.error("send data error: ", err)
            return false
        }
    }

    sendMessage(message: BaseMsg): Boolean {
        try{
            if(this.conn == null || this.status != ClientStatus.Logined) {
                return false
            }
            let data = BaseMsg.encode(message).finish()
            this.conn.send(data)
            return true
        }catch(err){
            console.error("send message error: ", err)
            return false
        }
    }

    private hearbeatLoop() {

    }
}

export enum Status {
    Connected = "connected",
    ConnectTimeout = "conn_timeout",
    ConnectError = "error"
}

// 建立websocket连接
const connect = async (url: string): Promise<{status: Status, conn: w3cwebsocket}> =>{
    const timeout = 5
    return new Promise((resolve, reject)=>{
        let conn = new w3cwebsocket(url)
        conn.binaryType = "arraybuffer"

        setTimeout(timeout * 1000, ()=>{
            resolve({status: Status.ConnectTimeout, conn:conn})
        })

        conn.onopen = ()=>{
            console.info("websocket connected")
            if(conn.readyState == w3cwebsocket.OPEN) {
                resolve({status:Status.Connected, conn:conn})
            }
        }

        conn.onerror = (err)=>{
            console.error("connect error: ", err)
            resolve({status:Status.ConnectError, conn:conn})
        }
    })
}