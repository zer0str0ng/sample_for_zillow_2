import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Entities from './../entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      // @ts-ignore
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('MSSQL_URL'),
        port: parseInt(configService.get<string>('MSSQL_PORT')),
        username: configService.get<string>('MSSQL_USERNAME'),
        password: configService.get<string>('MSSQL_PASSWORD'),
        database: configService.get<string>('MSSQL_DATABASE'),
        synchronize: false,
        entities: [...Entities],
        logging: ['error'],
        options: { trustServerCertificate: true },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class TypeORMModule {}
