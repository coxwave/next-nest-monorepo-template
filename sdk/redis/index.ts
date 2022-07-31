import { ConsoleLogger, Logger } from '@packages/utils';
import Redis from 'ioredis';
import { RedisOptions } from 'ioredis';

import type { MaybePromise } from '@packages/types';

type RedisKeySpaceCallback = (pattern: string, channel: string, cmd: string) => MaybePromise<void>;

// ===================================
// =============  Redis  =============
// ===================================

export function connectRedis(opt: RedisOptions) {
  return new RedisClient(opt);
}
export class RedisClient {
  private _opt: RedisOptions;
  private logger: Logger;

  private _client: Redis;

  constructor(opt: RedisOptions & { logger?: Logger }) {
    this._opt = opt;
    this._opt.db = opt.db || 0;
    this._opt.keyPrefix = opt.keyPrefix || '';

    this._client = new Redis(opt);
    this.logger = opt.logger || new ConsoleLogger();

    this._client.on('ready', () => {
      this.logger.info(`RedisClient: sueccssfully connected to ${opt.host}:${opt.port}`);
    });
  }

  get db(): string {
    return String(this._opt.db || '');
  }

  get client(): Redis {
    return this._client;
  }
}

// ===================================
// =========  Redis PubSub  ==========
// ===================================

export class RedisPubSub {
  pub: RedisClient;
  sub: RedisClient;
  private logger: Logger;

  constructor(pub: RedisClient, sub: RedisClient, logger?: Logger) {
    this.pub = pub;
    this.sub = sub;
    this.logger = logger || new ConsoleLogger();
  }

  start(event: string, watchPattern: string, callback: RedisKeySpaceCallback) {
    // Pub
    this.pub.client.config('SET', 'notify-keyspace-events', event);
    this.logger.info(`RedisPubSub: SET notifiy-keyspace-events to ${event}`);

    // Sub
    const pattern = `__keyspace@${this.pub.db || 0}__:${watchPattern}`;
    this.sub.client.psubscribe(pattern);
    this.sub.client.on('pmessage', async (_pattern, channel, cmd) => {
      if (pattern !== _pattern) return;

      await callback(_pattern, channel, cmd);
    });

    this.logger.info(`RedisPubSub: start subscription on pattern ${pattern}`);
  }
}

// ===================================
// =========  Redis Stream  ==========
// ===================================
export function startRedisStream(redis: RedisClient, opt: RedisStreamCreateOpt): RedisStream {
  const stream = new RedisStream(redis, opt);

  stream.start();

  return stream;
}

export type RedisStreamCreateOpt = {
  key: string;
  maxlen?: number;
  ttl?: number; // ms
  logger?: Logger;
};
export class RedisStream {
  redis: RedisClient;
  key: string;

  maxlen?: number;
  ttl?: number;
  private logger: Logger;

  constructor(redis: RedisClient, opt: RedisStreamCreateOpt) {
    this.redis = redis;
    this.key = opt.key;

    this.maxlen = opt.maxlen;
    this.ttl = opt.ttl;
    this.logger = opt.logger || new ConsoleLogger();
  }

  start() {
    this.logger.info('RedisStream: start redis stream');

    if (this.ttl !== undefined) {
      this.logger.info(`RedisStream: ttl is set to ${this.ttl}`);

      setInterval(() => {
        const minId = Date.now() - this.ttl!;
        this.redis.client.xtrim(this.key, 'MINID', minId);
      }, 1000); // set cleaning scheduler
    }
  }

  async xadd(input: { id?: string; message: object }): Promise<string> {
    const args = [];

    input.id ? args.push(input.id) : args.push('*');
    args.push(...Object.entries(input.message).flat());
    this.logger.debug(`RedisStream: XADD ${this.key}`);

    return (await this.redis.client.xadd(this.key, ...args)) || '';
  }

  async xlen(): Promise<number> {
    this.logger.debug(`RedisStream: XLEN ${this.key}`);

    return await this.redis.client.xlen(this.key);
  }

  // async xrage(start: string | number, end: string | number, count?: number) {
  //   const args = [start, end];

  //   if (count) args.push('COUNT', count);
  //   this.logger.debug(`RedisStream: XRANGE ${this.key} ${args.join(' ')}`);

  //   return await this.redis.client.xrange(this.key, ...args);
  // }

  // async xread(input: { id: string; count?: number; block?: number }): Promise<XReadResult[]> {
  //   const args = [];

  //   if (input.block) args.push('BLOCK', input.block);
  //   if (input.count) args.push('COUNT', input.count);
  //   args.push('STREAMS', this.key);
  //   args.push(input.id);
  //   this.logger.debug(`RedisStream: XREAD ${args.join(' ')}`);

  //   const result = await this.redis.client.xread(...args);

  //   if (!result) {
  //     return [];
  //   }
  //   return result
  //     .map((inner) => {
  //       const key = inner[0];
  //       const entries = inner[1];

  //       return entries
  //         .map((entry) => {
  //           const id = entry[0];
  //           const message = Object.fromEntries(chunk(entry[1], 2));

  //           return { key, id, message };
  //         })
  //         .flat();
  //     })
  //     .flat();
  // }

  // async xtrim(input: { maxlen?: number; minId: string }) {
  //   const args = [];

  //   if (input.maxlen) args.push('MAXLEN', input.maxlen);
  //   // if (input.minId) args.push(`MINID=${input.minId.split('-').slice(0, 1)}`);
  //   if (input.minId) args.push('MINID', '=', input.minId.split('-').slice(0, 1));

  //   this.logger.debug(`RedisStream: XTRIM ${this.key} ${args.join(' ')}`);

  //   return await this.redis.client.xtrim(this.key, ...args);
  // }
}

export type XReadResult = { key: string; id: string; message: { [key: string]: string } };
