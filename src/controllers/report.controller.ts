import { Controller, Body, Post } from '@nestjs/common';
import { ReportService } from '../services';
import { ReportParamsDTO } from './../dto';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  getReport(@Body() payload: ReportParamsDTO): Promise<string> {
    return this.reportService.getReport(payload);
  }
}
