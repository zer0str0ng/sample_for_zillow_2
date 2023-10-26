import { AVLDataInterface, DeviceInterface, EventInterface } from './../interfaces';
import { addHours } from 'date-fns';
import { AppConfig } from './../app.config';
import { DeviceEntity, EventEntity, HistoryEntity } from './../entities';
import { ILogger } from './../logger';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { ConfigType } from '@nestjs/config';
import { AppConst } from 'src/app.const';

@Injectable()
export class DBService {
  constructor(
    @InjectRepository(DeviceEntity)
    private deviceRepo: Repository<DeviceEntity>,
    @InjectRepository(EventEntity)
    private eventRepo: Repository<EventEntity>,
    @InjectRepository(HistoryEntity)
    private historyRepo: Repository<HistoryEntity>,
    @Inject(AppConfig.KEY)
    private config: ConfigType<typeof AppConfig>,
    private logger: ILogger
  ) {}

  findAllDevices(): Promise<DeviceInterface[]> {
    this.logger.debug('Getting all devices...');
    return this.deviceRepo.find({ relations: { vehicle: true } });
  }

  findDeviceBySerial(serial: string): Promise<DeviceInterface> {
    this.logger.debug('Getting device by serial', serial);
    return this.deviceRepo.findOne({
      where: { serial, enabled: true },
      relations: { vehicle: true },
    });
  }

  async saveHistory(locations: AVLDataInterface[], imei: string) {
    const device = await this.findDeviceBySerial(imei);
    if (!device) {
      this.logger.error('Device is not available in the DB', imei);
    }
    const event = await this.eventRepo.findOne({
      where: {
        startDateTime: LessThanOrEqual(new Date()),
        endDateTime: MoreThanOrEqual(new Date()),
        enabled: true,
      },
    });
    for (const location of locations) {
      this.saveRecord(device, event, location);
    }
  }

  saveRecord(device: DeviceInterface, event: EventInterface, avlData: AVLDataInterface): void {
    const history: HistoryEntity = {
      id: randomUUID(),
      deviceId: device.id,
      eventId: event?.id ?? null,
      vehicleId: device.vehicle?.id ?? null,
      vehicleName: device.vehicle?.name ?? null,
      location: `${avlData.GPSelement?.Latitude},${avlData.GPSelement?.Longitude}`,
      speed: `${avlData.GPSelement?.Speed.toFixed(2)}`,
      // Manual adjust for UTC
      locationDate: addHours(avlData.Timestamp, this.config.UTC_ADJUST),
      creationDate: new Date().toISOString(),
      enabled: true,
      source: AppConst.SOURCE,
      metadata: JSON.stringify(avlData.IOelement) ?? null,
    };

    this.historyRepo.save(history);
  }
}
