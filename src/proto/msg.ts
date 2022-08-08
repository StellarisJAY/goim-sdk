/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

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
  from: Long;
  to: Long;
  content: string;
  flag: MessageFlag;
  timestamp: Long;
  id: Long;
  seq: Long;
  deviceId: string;
}

function createBaseBaseMsg(): BaseMsg {
  return {
    from: Long.ZERO,
    to: Long.ZERO,
    content: "",
    flag: 0,
    timestamp: Long.ZERO,
    id: Long.ZERO,
    seq: Long.ZERO,
    deviceId: "",
  };
}

export const BaseMsg = {
  encode(
    message: BaseMsg,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.from.isZero()) {
      writer.uint32(8).int64(message.from);
    }
    if (!message.to.isZero()) {
      writer.uint32(16).int64(message.to);
    }
    if (message.content !== "") {
      writer.uint32(26).string(message.content);
    }
    if (message.flag !== 0) {
      writer.uint32(32).int32(message.flag);
    }
    if (!message.timestamp.isZero()) {
      writer.uint32(40).int64(message.timestamp);
    }
    if (!message.id.isZero()) {
      writer.uint32(48).int64(message.id);
    }
    if (!message.seq.isZero()) {
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
          message.from = reader.int64() as Long;
          break;
        case 2:
          message.to = reader.int64() as Long;
          break;
        case 3:
          message.content = reader.string();
          break;
        case 4:
          message.flag = reader.int32() as any;
          break;
        case 5:
          message.timestamp = reader.int64() as Long;
          break;
        case 6:
          message.id = reader.int64() as Long;
          break;
        case 7:
          message.seq = reader.int64() as Long;
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
      from: isSet(object.from) ? Long.fromValue(object.from) : Long.ZERO,
      to: isSet(object.to) ? Long.fromValue(object.to) : Long.ZERO,
      content: isSet(object.content) ? String(object.content) : "",
      flag: isSet(object.flag) ? messageFlagFromJSON(object.flag) : 0,
      timestamp: isSet(object.timestamp)
        ? Long.fromValue(object.timestamp)
        : Long.ZERO,
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.ZERO,
      seq: isSet(object.seq) ? Long.fromValue(object.seq) : Long.ZERO,
      deviceId: isSet(object.deviceId) ? String(object.deviceId) : "",
    };
  },

  toJSON(message: BaseMsg): unknown {
    const obj: any = {};
    message.from !== undefined &&
      (obj.from = (message.from || Long.ZERO).toString());
    message.to !== undefined && (obj.to = (message.to || Long.ZERO).toString());
    message.content !== undefined && (obj.content = message.content);
    message.flag !== undefined && (obj.flag = messageFlagToJSON(message.flag));
    message.timestamp !== undefined &&
      (obj.timestamp = (message.timestamp || Long.ZERO).toString());
    message.id !== undefined && (obj.id = (message.id || Long.ZERO).toString());
    message.seq !== undefined &&
      (obj.seq = (message.seq || Long.ZERO).toString());
    message.deviceId !== undefined && (obj.deviceId = message.deviceId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BaseMsg>, I>>(object: I): BaseMsg {
    const message = createBaseBaseMsg();
    message.from =
      object.from !== undefined && object.from !== null
        ? Long.fromValue(object.from)
        : Long.ZERO;
    message.to =
      object.to !== undefined && object.to !== null
        ? Long.fromValue(object.to)
        : Long.ZERO;
    message.content = object.content ?? "";
    message.flag = object.flag ?? 0;
    message.timestamp =
      object.timestamp !== undefined && object.timestamp !== null
        ? Long.fromValue(object.timestamp)
        : Long.ZERO;
    message.id =
      object.id !== undefined && object.id !== null
        ? Long.fromValue(object.id)
        : Long.ZERO;
    message.seq =
      object.seq !== undefined && object.seq !== null
        ? Long.fromValue(object.seq)
        : Long.ZERO;
    message.deviceId = object.deviceId ?? "";
    return message;
  },
};

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
  : T extends Long
  ? string | number | Long
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
