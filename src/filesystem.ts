import { access, constants, mkdir, readFile, writeFile } from 'fs';
import { promisify } from 'util';

const { F_OK } = constants;

export const create = promisify(mkdir);

export const read = promisify(readFile);

export const write = promisify(writeFile);

export const exists = (path: string): Promise<void> =>
  new Promise((resolve, reject): void => {
    access(path, F_OK, error => {
      error ? reject(error) : resolve();
    });
  });
