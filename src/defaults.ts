import { Parser, Transformer } from '..';

export const parser: Parser = <T>(from: string): T => JSON.parse(from);

export const transformer: Transformer = <T>(to: T): string =>
  JSON.stringify(to);
