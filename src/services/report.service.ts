import { AppConfig } from './../app.config';
import { AppConst, GeoFenceMap, GEOFENCE_ACTION } from './../app.const';
import { Between, FindOptionsWhere, In, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { ConfigType } from '@nestjs/config';
import { format } from 'date-fns';
import { HistoryEntity } from './../entities';
import { HistoryInterface, IOelementInterface, ReportInterface, ReportParamsInterface } from './../interfaces';
import { ILogger } from './../logger';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty, groupBy, template } from 'lodash';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(HistoryEntity)
    private historyRepo: Repository<HistoryEntity>,
    @Inject(AppConfig.KEY)
    private config: ConfigType<typeof AppConfig>,
    private logger: ILogger
  ) {}

  async getHistoryByParams(params: ReportParamsInterface): Promise<HistoryInterface[]> {
    const where: FindOptionsWhere<HistoryEntity> = { enabled: true };
    if (params.eventId) where.eventId = params.eventId;

    if (params.startDate && params.endDate) where.locationDate = Between(params.startDate, params.endDate);
    else if (params.startDate) where.locationDate = MoreThanOrEqual(params.startDate);
    else if (params.endDate) where.locationDate = LessThanOrEqual(params.endDate);

    if (!isEmpty(params.vehicleIds)) where.vehicleId = In(params.vehicleIds);
    if (!isEmpty(params.deviceIds)) where.deviceId = In(params.deviceIds);

    return await this.historyRepo.find({ where, relations: { device: true, vehicle: true } });
  }

  convertToCsv(arr: ReportInterface[]) {
    const keys = Object.keys(arr[0]);
    const replacer = (_key: string, value: string) => (value === null ? '' : value);
    const processRow = (row: ReportInterface) => keys.map((key) => JSON.stringify(row[key], replacer)).join(',');
    return [keys.join(','), ...arr.map(processRow)].join('\r\n');
  }

  async getReport(params: ReportParamsInterface): Promise<string> {
    this.logger.debug('Generating report...', JSON.stringify(params));

    const wholeHistory = await this.getHistoryByParams(params);

    if (isEmpty(wholeHistory)) return Promise.resolve('No information available for the given parameters');

    const processedData = this.processedData(wholeHistory);

    return Promise.resolve(this.convertToCsv(processedData));
  }

  processedData(data: HistoryInterface[]): ReportInterface[] {
    const result: ReportInterface[] = [];
    const historyByDevice = groupBy(data, 'deviceId');

    Object.keys(historyByDevice).forEach((device) => {
      const entry = this.getNewEntry();
      const deviceHistory = historyByDevice[device];
      const maxVelObj = deviceHistory.reduce(function (prev: HistoryInterface, current: HistoryInterface) {
        return parseFloat(prev.speed) > parseFloat(current.speed) ? prev : current;
      });

      entry.device = `${maxVelObj.vehicleName}`;
      entry.maxVel = `${maxVelObj.speed}`;
      entry.location = `${this.getGoogleLink(maxVelObj.location)}`;
      entry.imei = `'${maxVelObj.device?.serial}`;
      entry.type = `${maxVelObj.vehicle?.type}`;

      deviceHistory.forEach((historyRecord) => {
        if (historyRecord.metadata?.length) {
          const ioElement = JSON.parse(historyRecord.metadata) as IOelementInterface;
          Object.keys(ioElement.Elements).forEach((avlKey) => {
            const geoFenceNum = GeoFenceMap.get(avlKey);

            if (geoFenceNum) {
              const geoFenceValue = ioElement.Elements[avlKey];

              const fieldName = this.getFieldName(geoFenceNum, `${geoFenceValue}`);

              if (fieldName) {
                entry[fieldName] = `${format(historyRecord.locationDate, AppConst.DATE_TIME_FORMAT)} - ${historyRecord.speed}km/h`;
              }
            }
          });
        }
      });

      result.push(entry);
    });

    return result;
  }

  getFieldName(geoFenceNum: string, value: string) {
    let actionStr = null;

    switch (value) {
      case GEOFENCE_ACTION.ENTER_ZONE: {
        actionStr = 'Enter';
        break;
      }
      case GEOFENCE_ACTION.LEFT_ZONE: {
        actionStr = 'Exit';
        break;
      }
      case GEOFENCE_ACTION.OVER_SPEED_START: {
        actionStr = 'Exc';
        break;
      }
      default:
        break;
    }

    if (!actionStr) return null;

    return `geo${geoFenceNum}${actionStr}`;
  }

  getGoogleLink(coords: string) {
    return template(this.config.GMAPS_LOCATION_URL)({ coords });
  }

  getNewEntry(): ReportInterface {
    return {
      type: '',
      device: '',
      imei: '',
      maxVel: '',
      location: '',
      geo1Enter: '',
      geo1Exit: '',
      geo1Exc: '',
      geo2Enter: '',
      geo2Exit: '',
      geo2Exc: '',
      geo3Enter: '',
      geo3Exit: '',
      geo3Exc: '',
      geo4Enter: '',
      geo4Exit: '',
      geo4Exc: '',
      geo5Enter: '',
      geo5Exit: '',
      geo5Exc: '',
      geo6Enter: '',
      geo6Exit: '',
      geo6Exc: '',
      geo7Enter: '',
      geo7Exit: '',
      geo7Exc: '',
      geo8Enter: '',
      geo8Exit: '',
      geo8Exc: '',
      geo9Enter: '',
      geo9Exit: '',
      geo9Exc: '',
      geo10Enter: '',
      geo10Exit: '',
      geo10Exc: '',
      geo11Enter: '',
      geo11Exit: '',
      geo11Exc: '',
      geo12Enter: '',
      geo12Exit: '',
      geo12Exc: '',
      geo13Enter: '',
      geo13Exit: '',
      geo13Exc: '',
      geo14Enter: '',
      geo14Exit: '',
      geo14Exc: '',
      geo15Enter: '',
      geo15Exit: '',
      geo15Exc: '',
      geo16Enter: '',
      geo16Exit: '',
      geo16Exc: '',
      geo17Enter: '',
      geo17Exit: '',
      geo17Exc: '',
      geo18Enter: '',
      geo18Exit: '',
      geo18Exc: '',
      geo19Enter: '',
      geo19Exit: '',
      geo19Exc: '',
      geo20Enter: '',
      geo20Exit: '',
      geo20Exc: '',
      geo21Enter: '',
      geo21Exit: '',
      geo21Exc: '',
      geo22Enter: '',
      geo22Exit: '',
      geo22Exc: '',
      geo23Enter: '',
      geo23Exit: '',
      geo23Exc: '',
      geo24Enter: '',
      geo24Exit: '',
      geo24Exc: '',
      geo25Enter: '',
      geo25Exit: '',
      geo25Exc: '',
    };
  }
}
