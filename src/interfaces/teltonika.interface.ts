export interface BufferInterface {
  buffer: number[];
  imei: number;
}

export interface PacketParsedInterface {
  imei?: string;
  dataPacket?: ProtocolParserInterface;
}

export interface ProtocolParserInterface {
  Packet: string;
  Preamble: number;
  Data_Length: number;
  CodecID: number;
  Quantity1: number;
  CodecType: 'data sending' | 'GPRS messages';
  Content: GPRSInterface | DataInterface | null;
  Quantity2: number;
  CRC: number;
}

export interface DataInterface {
  AVL_Datas: AVLDataInterface[];
}

export interface AVLDataInterface {
  Timestamp: Date;
  Priority: number;
  GPSelement: GPSelementInterface;
  IOelement: IOelementInterface;
}

export interface GPSelementInterface {
  Longitude: number;
  Latitude: number;
  Altitude: number;
  Angle: number;
  Satellites: number;
  Speed: number;
}

export interface IOelementInterface {
  EventID: number;
  ElementCount: number;
  Elements: {
    [avlid: number]: number | string;
  };
}

export interface GPRSInterface {
  type: 5 | 6;
  isResponse: boolean;
  responseStr: string;
}
