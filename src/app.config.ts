import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const AppConfig = registerAs('AppConfig', () => ({
  API_KEY: process.env.API_KEY,
  PORT: process.env.PORT,
  MOCK_MODE: process.env.MOCK_MODE,
  MSSQL_DATABASE: process.env.MYSQL_DATABASE,
  MSSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MSSQL_PORT: process.env.MYSQL_PORT,
  MSSQL_URL: process.env.MYSQL_URL,
  MSSQL_USERNAME: process.env.MYSQL_USERNAME,
  NODE_ENV: process.env.NODE_ENV,
  UTC_ADJUST: parseInt(process.env.UTC_ADJUST, 10),
  GMAPS_LOCATION_URL: process.env.GMAPS_LOCATION_URL,
}));

export const AppConfigSchema = Joi.object({
  API_KEY: Joi.string().required(),
  PORT: Joi.string().required(),
  MOCK_MODE: Joi.string().required(),
  MSSQL_DATABASE: Joi.string().required(),
  MSSQL_PASSWORD: Joi.string().required(),
  MSSQL_PORT: Joi.string().required(),
  MSSQL_URL: Joi.string().required(),
  MSSQL_USERNAME: Joi.string().required(),
  NODE_ENV: Joi.string().required(),
  UTC_ADJUST: Joi.number().required(),
  GMAPS_LOCATION_URL: Joi.string().required(),
});
