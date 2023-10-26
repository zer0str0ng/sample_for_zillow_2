import { IsArray, IsISO8601, IsString, IsUUID, ValidateIf, ValidateNested } from 'class-validator';
import { ReportParamsInterface } from './../interfaces';

export class ReportParamsDTO implements ReportParamsInterface {
  @ValidateIf((o) => !o.eventId)
  @IsISO8601()
  startDate?: Date;

  @ValidateIf((o) => !o.eventId)
  @IsISO8601()
  endDate?: Date;

  @ValidateIf((o) => !o.vehicleIds)
  @IsArray()
  @IsString({ each: true })
  deviceIds?: string[];

  @ValidateIf((o) => !o.deviceIds)
  @IsArray()
  @IsString({ each: true })
  vehicleIds?: string[];

  @ValidateIf((o) => !o.startDate || !o.endDate)
  @IsUUID()
  eventId?: string;
}
