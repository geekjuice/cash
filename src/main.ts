import { createHash } from 'crypto';
import { tmpdir } from 'os';
import { join } from 'path';
import debug from 'debug';
import { parser, transformer } from './defaults';
import { create, read, write, exists } from './filesystem';
import { Getter, Parser, Transformer } from '..';

const logger = debug('cash');

const dirpath = join(tmpdir(), 'cash-cache');

const md5 = (key: string): string =>
  createHash('md5')
    .update(key, 'utf8')
    .digest('hex');

const filepath = (key: string): string => join(dirpath, md5(key));

exports.has = async (key: string): Promise<boolean> => {
  try {
    const filename = filepath(key);
    debug('cash:has')(filename);
    await exists(filename);
    return true;
  } catch (error) {
    return false;
  }
};

exports.get = async <T>(key: string, parse: Parser = parser): Promise<T> => {
  try {
    const filename = filepath(key);
    debug('cash:get')(`reading ${filename}`);
    const buffer = await read(filename);
    const data = buffer.toString();
    return parse<T>(data);
  } catch (error) {
    debug('cash:get:error')(error);
    return null;
  }
};

exports.set = async <T>(
  key: string,
  data: T,
  transform: Transformer = transformer
): Promise<void> => {
  try {
    const filename = filepath(key);
    debug('cash:set')(filename);
    await create(dirpath, { recursive: true });
    await write(filename, transform<T>(data));
  } catch (error) {
    debug('cash:set:error')(error);
    return;
  }
};

exports.cached = async <T>(
  key: string,
  getter: Getter,
  transform: Transformer = transformer,
  parse: Parser = parser
): Promise<string> => {
  try {
    const cached = await exports.has(key);
    if (!cached) {
      debug('cash:cached')(`missed ${key}`);
      const value = await getter<T>();
      await exports.set(key, value, transform);
    }
    return exports.get(key, parse);
  } catch (error) {
    return null;
  }
};
