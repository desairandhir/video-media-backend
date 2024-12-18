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
    AUTH_TOKEN: getEnvVariableValue('JWT_AUTH_TOKEN'),
    REFRESH_TOKEN: getEnvVariableValue('JWT_REFRESH_TOKEN'),
    EXPIRES_IN: getEnvVariableValue('EXPIRES_IN'),
  },
  APP: {
    PORT: getEnvVariableValue('PORT'),
  },
  REDIS: {
    HOST: getEnvVariableValue('REDIS_HOST'),
    PORT: parseInt(getEnvVariableValue('REDIS_PORT')),
  },
};
