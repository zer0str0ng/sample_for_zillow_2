import { ApiKeyStrategy } from './auth/api.key.strategy';
import { AppConfig, AppConfigSchema } from './app.config';
import { AuthMiddleware } from './auth/api.middleware';
import { ConfigModule } from '@nestjs/config';
import { DBService, TeltonikaService } from './services';
import { ILogger } from './logger';
import { isMockMode, isReportMode } from './utils';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeORMModule } from './modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as net from 'net';
import Controllers from './controllers';
import Entities from './entities';
import Services from './services';
@Module({
  imports: [
    TypeOrmModule.forFeature([...Entities]),
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [AppConfig],
      validationSchema: AppConfigSchema,
    }),
    TypeORMModule,
  ],
  controllers: [...Controllers],
  providers: [
    ApiKeyStrategy,
    ...Services,
    {
      provide: 'TCP_SERVER_SERVICE',
      useFactory: (_dbService, _logger) => {
        if (!isMockMode() && !isReportMode()) {
          const server = net
            .createServer((socket) => {
              socket.on('data', function (data: Buffer) {
                new TeltonikaService(_dbService, _logger).process(data, socket);
              });
            })
            .listen(parseInt(process.env.PORT, 10) || 3000, '0.0.0.0');

          return server;
        }
      },
      inject: [DBService, ILogger],
    },
    ILogger,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(...Controllers);
  }
}
