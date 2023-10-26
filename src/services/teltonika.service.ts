const binutils = require('binutils64');
import { DataInterface, GPRSInterface, PacketParsedInterface } from '../interfaces';
import { DBService } from './db.service';
import { ILogger } from './../logger';
import { Injectable } from '@nestjs/common';
import { ProtocolParser, parseIMEI } from 'complete-teltonika-parser';
import * as net from 'net';

@Injectable()
export class TeltonikaService {
  constructor(private dbService: DBService, private logger: ILogger) {}
  process(buffer: Buffer, socket?: net.Socket, imei?: number): void {
    try {
      this.logger.info('Incoming message...');
      const parsed: PacketParsedInterface = this.processPacket(buffer.toString('hex'));

      if (parsed.imei) {
        this.logger.info('It is an IMEI>', parsed.imei);
        if (socket) {
          socket.write(Buffer.alloc(1, 1));
          // @ts-ignore
          socket.imei = parsed.imei;
        }
      } else {
        // @ts-ignore
        const sessionImei = socket?.imei ?? imei;
        this.logger.info('AVL> ', JSON.stringify(parsed.dataPacket), 'IMEI>', sessionImei);

        /* Save the event into the database */
        this.saveHistory(parsed, sessionImei);

        const writer = new binutils.BinaryWriter();
        writer.WriteInt32((parsed.dataPacket.Content as DataInterface).AVL_Datas?.length ?? 0);
        const response = writer.ByteBuffer;
        socket?.write(response);
      }
    } catch (ex) {
      this.logger.error(JSON.stringify(buffer.toJSON()), ex.message, 'Unexpected error while processing message');
    }
  }

  saveHistory(packet: PacketParsedInterface, sessionImei: string): void {
    if (!sessionImei) {
      this.logger.error('IMEI is not available to save data', JSON.stringify(packet));
      return;
    }

    const avlData = (packet?.dataPacket?.Content as DataInterface).AVL_Datas;
    if (!avlData) {
      this.logger.error('AVL Date is not available for the message', JSON.stringify(packet));
      return;
    }

    this.logger.info('AVL Count>', `${avlData?.length}`);

    this.dbService.saveHistory(avlData, sessionImei);
  }

  processPacket(packet: string) {
    if (packet.length == 34) {
      return {
        imei: parseIMEI(packet),
      };
    } else {
      return {
        dataPacket: new ProtocolParser(packet),
      };
    }
  }
}
