/* eslint-disable */
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "msg";

/** MessageFlag 消息类型定义 */
export enum MessageFlag {
  From = 0,
  To = 1,
  Group = 2,
  FriendAccepted = 11,
  GroupInvitationAccepted = 21,
  /** EncryptedMessage - 加密消息，服务端只负责转发，不进行持久化和分析 */
  EncryptedMessage = 501,
  /** EncryptMessageHandshake1 - 加密通信第一次握手：发起者向接收者请求开启加密通信，该消息用于验证好友关系以及让对方确认 */
  EncryptMessageHandshake1 = 502,
  /** EncryptMessageHandshake2 - 加密通信第二次握手：接收方生成非对称钥匙对，将公钥发送给发起者 */
  EncryptMessageHandshake2 = 503,
  /** EncryptMessageHandshake3 - 加密通信第三次握手：发起者收到后用公钥加密一个随机数回复给接收者 */
  EncryptMessageHandshake3 = 504,
  UNRECOGNIZED = -1,
}

export function messageFlagFromJSON(object: any): MessageFlag {
  switch (object) {
    case 0:
    case "From":
      return MessageFlag.From;
    case 1:
    case "To":
      return MessageFlag.To;
    case 2:
    case "Group":
      return MessageFlag.Group;
    case 11:
    case "FriendAccepted":
      return MessageFlag.FriendAccepted;
    case 21:
    case "GroupInvitationAccepted":
      return MessageFlag.GroupInvitationAccepted;
    case 501:
    case "EncryptedMessage":
      return MessageFlag.EncryptedMessage;
    case 502:
    case "EncryptMessageHandshake1":
      return MessageFlag.EncryptMessageHandshake1;
    case 503:
    case "EncryptMessageHandshake2":
      return MessageFlag.EncryptMessageHandshake2;
    case 504:
    case "EncryptMessageHandshake3":
      return MessageFlag.EncryptMessageHandshake3;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MessageFlag.UNRECOGNIZED;
  }
}

export function messageFlagToJSON(object: MessageFlag): string {
  switch (object) {
    case MessageFlag.From:
      return "From";
    case MessageFlag.To:
      return "To";
    case MessageFlag.Group:
      return "Group";
    case MessageFlag.FriendAccepted:
      return "FriendAccepted";
    case MessageFlag.GroupInvitationAccepted:
      return "GroupInvitationAccepted";
    case MessageFlag.EncryptedMessage:
      return "EncryptedMessage";
    case MessageFlag.EncryptMessageHandshake1:
      return "EncryptMessageHandshake1";
    case MessageFlag.EncryptMessageHandshake2:
      return "EncryptMessageHandshake2";
    case MessageFlag.EncryptMessageHandshake3:
      return "EncryptMessageHandshake3";
    case MessageFlag.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface BaseMsg {
  from: number;
  to: number;
  content: string;
  flag: MessageFlag;
  timestamp: number;
  id: number;
  seq: number;
  deviceId: string;
}

function createBaseBaseMsg(): BaseMsg {
  return {
    from: 0,
    to: 0,
    content: "",
    flag: 0,
    timestamp: 0,
    id: 0,
    seq: 0,
    deviceId: "",
  };
}

export const BaseMsg = {
  encode(
    message: BaseMsg,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.from !== 0) {
      writer.uint32(8).int64(message.from);
    }
    if (message.to !== 0) {
      writer.uint32(16).int64(message.to);
    }
    if (message.content !== "") {
      writer.uint32(26).string(message.content);
    }
    if (message.flag !== 0) {
      writer.uint32(32).int32(message.flag);
    }
    if (message.timestamp !== 0) {
      writer.uint32(40).int64(message.timestamp);
    }
    if (message.id !== 0) {
      writer.uint32(48).int64(message.id);
    }
    if (message.seq !== 0) {
      writer.uint32(56).int64(message.seq);
    }
    if (message.deviceId !== "") {
      writer.uint32(66).string(message.deviceId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BaseMsg {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBaseMsg();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.to = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.content = reader.string();
          break;
        case 4:
          message.flag = reader.int32() as any;
          break;
        case 5:
          message.timestamp = longToNumber(reader.int64() as Long);
          break;
        case 6:
          message.id = longToNumber(reader.int64() as Long);
          break;
        case 7:
          message.seq = longToNumber(reader.int64() as Long);
          break;
        case 8:
          message.deviceId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BaseMsg {
    return {
      from: isSet(object.from) ? Number(object.from) : 0,
      to: isSet(object.to) ? Number(object.to) : 0,
      content: isSet(object.content) ? String(object.content) : "",
      flag: isSet(object.flag) ? messageFlagFromJSON(object.flag) : 0,
      timestamp: isSet(object.timestamp) ? Number(object.timestamp) : 0,
      id: isSet(object.id) ? Number(object.id) : 0,
      seq: isSet(object.seq) ? Number(object.seq) : 0,
      deviceId: isSet(object.deviceId) ? String(object.deviceId) : "",
    };
  },

  toJSON(message: BaseMsg): unknown {
    const obj: any = {};
    message.from !== undefined && (obj.from = Math.round(message.from));
    message.to !== undefined && (obj.to = Math.round(message.to));
    message.content !== undefined && (obj.content = message.content);
    message.flag !== undefined && (obj.flag = messageFlagToJSON(message.flag));
    message.timestamp !== undefined &&
      (obj.timestamp = Math.round(message.timestamp));
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.seq !== undefined && (obj.seq = Math.round(message.seq));
    message.deviceId !== undefined && (obj.deviceId = message.deviceId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BaseMsg>, I>>(object: I): BaseMsg {
    const message = createBaseBaseMsg();
    message.from = object.from ?? 0;
    message.to = object.to ?? 0;
    message.content = object.content ?? "";
    message.flag = object.flag ?? 0;
    message.timestamp = object.timestamp ?? 0;
    message.id = object.id ?? 0;
    message.seq = object.seq ?? 0;
    message.deviceId = object.deviceId ?? "";
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
