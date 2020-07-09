import Redis, { Redis as RedisClient } from 'ioredis';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import cacheConfig from '@config/cache';

class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async invalidate(key: string): Promise<void> {}

  public async invalidatePrefix(prefix: string): Promise<void> {
    //Pega todos as chaves que começam com o prefixo passado
    const keys = await this.client.keys(`${prefix}:*`);

    //pipeline é para execução de múltiplas oprações simultaneas
    const pipeline = this.client.pipeline();

    //exclui todas as keys
    keys.forEach(key => pipeline.del(key));

    await pipeline.exec();
  }
}

export default RedisCacheProvider;
