import { DBService } from './db.service';
import { ReportService } from './report.service';
import { TeltonikaService } from './teltonika.service';

export * from './db.service';
export * from './report.service';
export * from './teltonika.service';

export default [DBService, ReportService, TeltonikaService];
