/* eslint-disable */
import { SpnState } from '../testnet/spnState'
import { Writer, Reader } from 'protobufjs/minimal'

export const protobufPackage = 'lubtd.ibclab.testnet'

/** GenesisState defines the testnet module's genesis state. */
export interface GenesisState {
  /** this line is used by starport scaffolding # genesis/proto/state */
  spnStateList: SpnState[]
  /** this line is used by starport scaffolding # genesis/proto/stateField */
  portId: string
}

const baseGenesisState: object = { portId: '' }

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    for (const v of message.spnStateList) {
      SpnState.encode(v!, writer.uint32(18).fork()).ldelim()
    }
    if (message.portId !== '') {
      writer.uint32(10).string(message.portId)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseGenesisState } as GenesisState
    message.spnStateList = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 2:
          message.spnStateList.push(SpnState.decode(reader, reader.uint32()))
          break
        case 1:
          message.portId = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState
    message.spnStateList = []
    if (object.spnStateList !== undefined && object.spnStateList !== null) {
      for (const e of object.spnStateList) {
        message.spnStateList.push(SpnState.fromJSON(e))
      }
    }
    if (object.portId !== undefined && object.portId !== null) {
      message.portId = String(object.portId)
    } else {
      message.portId = ''
    }
    return message
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {}
    if (message.spnStateList) {
      obj.spnStateList = message.spnStateList.map((e) =>
        e ? SpnState.toJSON(e) : undefined
      )
    } else {
      obj.spnStateList = []
    }
    message.portId !== undefined && (obj.portId = message.portId)
    return obj
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState
    message.spnStateList = []
    if (object.spnStateList !== undefined && object.spnStateList !== null) {
      for (const e of object.spnStateList) {
        message.spnStateList.push(SpnState.fromPartial(e))
      }
    }
    if (object.portId !== undefined && object.portId !== null) {
      message.portId = object.portId
    } else {
      message.portId = ''
    }
    return message
  }
}

type Builtin = Date | Function | Uint8Array | string | number | undefined
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>
