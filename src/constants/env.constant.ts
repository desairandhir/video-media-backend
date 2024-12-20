import { config } from 'dotenv';

config();

const getEnvVariableValue = (envVariableKey) => {
  const _var = process.env[envVariableKey];
  if (!_var)
    throw new Error(`Unable to locate env. variable: ${envVariableKey}`);
  return _var;
};

export const Env = {
  MYSQL: {
    HOST: getEnvVariableValue('MYSQL_HOST'),
    PORT: parseInt(getEnvVariableValue('MYSQL_PORT')),
    USERNAME: getEnvVariableValue('MYSQL_USERNAME'),
    PASSWORD: getEnvVariableValue('MYSQL_PASSWORD'),
    DATABASE: getEnvVariableValue('MYSQL_DATABASE'),
    AUTOLOADENTITIES: getEnvVariableValue('AUTOLOADENTITIES'),
    SYNCHRONIZE: getEnvVariableValue('SYNCHRONIZE'),
  },
  SWAGGER: {
    USER: getEnvVariableValue('SWAGGER_USER'),
    PASSWORD: getEnvVariableValue('SWAGGER_PASSWORD'),
  },
  JWT: {
    AUTH_TOKEN: process.env.JWT_AUTH_TOKEN || 'fallback_secret',
    EXPIRES_IN: process.env.JWT_EXPIRES_IN || '3600',
    REFRESH_TOKEN: getEnvVariableValue('JWT_REFRESH_TOKEN'),
  },
  APP: {
    PORT: getEnvVariableValue('PORT'),
  },
  REDIS: {
    HOST: getEnvVariableValue('REDIS_HOST'),
    PORT: parseInt(getEnvVariableValue('REDIS_PORT')),
  },
};
