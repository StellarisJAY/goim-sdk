/* eslint-disable */
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "client";

export enum HandshakeStatus {
  Success = 0,
  AccessDenied = 1,
  UNRECOGNIZED = -1,
}

export function handshakeStatusFromJSON(object: any): HandshakeStatus {
  switch (object) {
    case 0:
    case "Success":
      return HandshakeStatus.Success;
    case 1:
    case "AccessDenied":
      return HandshakeStatus.AccessDenied;
    case -1:
    case "UNRECOGNIZED":
    default:
      return HandshakeStatus.UNRECOGNIZED;
  }
}

export function handshakeStatusToJSON(object: HandshakeStatus): string {
  switch (object) {
    case HandshakeStatus.Success:
      return "Success";
    case HandshakeStatus.AccessDenied:
      return "AccessDenied";
    case HandshakeStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface HandshakeRequest {
  token: string;
}

export interface HandshakeResponse {
  status: HandshakeStatus;
}

function createBaseHandshakeRequest(): HandshakeRequest {
  return { token: "" };
}

export const HandshakeRequest = {
  encode(
    message: HandshakeRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.token !== "") {
      writer.uint32(10).string(message.token);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HandshakeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHandshakeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HandshakeRequest {
    return {
      token: isSet(object.token) ? String(object.token) : "",
    };
  },

  toJSON(message: HandshakeRequest): unknown {
    const obj: any = {};
    message.token !== undefined && (obj.token = message.token);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<HandshakeRequest>, I>>(
    object: I
  ): HandshakeRequest {
    const message = createBaseHandshakeRequest();
    message.token = object.token ?? "";
    return message;
  },
};

function createBaseHandshakeResponse(): HandshakeResponse {
  return { status: 0 };
}

export const HandshakeResponse = {
  encode(
    message: HandshakeResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HandshakeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHandshakeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HandshakeResponse {
    return {
      status: isSet(object.status) ? handshakeStatusFromJSON(object.status) : 0,
    };
  },

  toJSON(message: HandshakeResponse): unknown {
    const obj: any = {};
    message.status !== undefined &&
      (obj.status = handshakeStatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<HandshakeResponse>, I>>(
    object: I
  ): HandshakeResponse {
    const message = createBaseHandshakeResponse();
    message.status = object.status ?? 0;
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

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
// if (_m0.util.Long !== Long) {
 
// }
 _m0.util.Long = Long as any;
  _m0.configure();
function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
