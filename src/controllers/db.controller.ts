import { Controller, Get, Param } from '@nestjs/common';
import { DBService } from '../services';
import { DeviceInterface, ParamsInterface } from '../interfaces';

@Controller('db')
export class DBController {
  constructor(private readonly deviceService: DBService) {}

  @Get('device')
  getClients(): Promise<DeviceInterface[]> {
    return this.deviceService.findAllDevices();
  }

  @Get('device/:id')
  findOne(@Param() params: ParamsInterface): Promise<DeviceInterface> {
    return this.deviceService.findDeviceBySerial(params.id);
  }
}
