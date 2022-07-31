import { ConsoleLogger, Logger } from './logger';

import type { Nullable } from '@packages/types';

class Cache<K, V> extends Map<K, V> {
  ttl: number;

  constructor(opt: { ttl?: number }) {
    super();

    const { ttl } = opt;

    this.ttl = ttl || Infinity;
  }

  set(key: K, value: V, callback?: () => void): this {
    super.set(key, value);

    if (this.ttl) {
      setTimeout(() => {
        this.delete(key);
        callback && callback();
      }, this.ttl);
    }
    return this;
  }

  pop(key: K): V | undefined {
    const v = this.get(key);
    this.delete(key);
    return v;
  }
}

const mapiter = Map.prototype[Symbol.iterator];
Cache.prototype.entries = function* cacheEntries() {
  for (let pair of this) {
    yield pair;
  }
  return;
};
Cache.prototype.keys = function* cacheKeys() {
  for (let pair of this) {
    yield pair[0];
  }
  return;
};
Cache.prototype.values = function* cacheValues() {
  for (let pair of this) {
    yield pair[1];
  }
  return;
};
Cache.prototype[Symbol.iterator] = function* cacheIterator() {
  const now = new Date();
  for (let pair of mapiter.apply(this)) {
    yield pair;
  }
};

export type EventHandlerOpt = {
  ttl?: number;
  logger?: Logger;
};

class _EventHandler {
  cache: Cache<string, Event> = new Cache({ ttl: 300000 }); // default 300s
  logger: Logger = new ConsoleLogger();

  constructor() {}

  updateTTL(ttl: number) {
    this.cache.ttl = ttl;
  }

  updateLogger(logger: Logger) {
    this.logger = logger;
  }

  async waitFor<T>(key: string, timeout: number): Promise<T | Error> {
    return new Promise((resolve, reject) => {
      this.logger.debug(`EventHandler: start waiting for event ${key} for ${timeout} ms`);
      this.cache.set(key, new Event({ resolve, reject, timeout, key }), () => {
        this.logger.debug(`Cache: delete key ${key} due to timeout after ${this.cache.ttl} ms`);
      });
    });
  }

  isWaitingFor(key: string): boolean {
    return this.cache.has(key);
  }

  resolve<T>(key: string, value: T) {
    const event = this.cache.pop(key);
    if (!event) {
      this.logger.warn(`EventHandler: EventNotFound, event ${key} does not exists`);
      return;
    }

    event.resolve(value);
    this.logger.debug(`EventHandler: successfully resolved event ${key}`);
  }

  reject<E extends Error = Error>(key: string, err: E) {
    const event = this.cache.pop(key);
    if (!event) {
      this.logger.warn(`EventHandler: EventNotFound event ${key} does not exists`);
      return;
    }

    event.reject(err);
    this.logger.debug(`EventHandler: rejected event ${key}`);
  }
}

class Event<T = any, E extends Error = Error> {
  private _resolve: (value: T | PromiseLike<T>) => void;
  private _reject: (value: E) => void;
  private _timeout: Nullable<NodeJS.Timeout>;

  private key: string;

  constructor(input: {
    resolve: (value: T | PromiseLike<T>) => void;
    reject: (value: E) => void;
    timeout: number | null;
    key?: string;
  }) {
    const { resolve, reject, timeout } = input;
    this.key = input.key || '';

    this._resolve = resolve;
    this._reject = reject;
    this._timeout = !timeout
      ? null
      : setTimeout(
          () => reject(new Error(`Event: event ${this.key || ''} timed out after ${timeout}`) as E),
          timeout,
        );
  }

  resolve(value: T | PromiseLike<T>) {
    this._resolve(value);
    this.clearTimeout();
  }

  reject(err: E) {
    this._reject(err);
    this.clearTimeout();
  }

  private clearTimeout() {
    this._timeout && clearTimeout(this._timeout);
  }
}

export const EventHandler = new _EventHandler();
