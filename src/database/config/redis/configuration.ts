import { RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { yamlParser } from 'src/commons/yamlParser';
export function redisParseConfig(): RedisModuleOptions {
  const YAML_CONFIG_FILENAME = 'config.yaml';
  const config = yamlParser(YAML_CONFIG_FILENAME);
  const redisOption: RedisModuleOptions = {
    config: {
      host: config.database.redis.host ?? '127.0.0.1',
      port: parseInt(config.database.redis.port) ?? 6379,
      password: config.database.redis.password ?? '',
    },
  };
  return redisOption;
}
