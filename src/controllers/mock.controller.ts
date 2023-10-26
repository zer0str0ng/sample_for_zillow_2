import { Body, Controller, Post } from '@nestjs/common';
import { BufferInterface } from '../interfaces/teltonika.interface';
import { TeltonikaService } from '../services/teltonika.service';
import { isMockMode } from 'src/utils';
import { ForbiddenException } from '@nestjs/common/exceptions';

@Controller('mock-controller')
export class MockController {
  constructor(private readonly teltonikaService: TeltonikaService) {}
  @Post()
  createClient(@Body() payload: BufferInterface): Promise<boolean> {
    if (!isMockMode()) throw new ForbiddenException('Mock Mode is not activated');
    const buffer = Buffer.from(payload.buffer);
    this.teltonikaService.process(buffer, undefined, payload.imei);
    return Promise.resolve(true);
  }
}
