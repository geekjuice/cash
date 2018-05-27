// Type definitions for @geekjuice/cash 1.0.0
// Project: @geekjuice/cash
// Definitions by: hello@undefined.engineer <undefined.engineer>

export type Getter = <T>() => T | Promise<T>;

export type Parser = <T>(from: string) => T;

export type Transformer = <T>(to: T) => string;

export function has(key: string): Promise<boolean>;

export function get<T>(key: string, parse?: Parser): Promise<string>;

export function set<T>(
  key: string,
  data: T,
  transform?: Transformer
): Promise<void>;

export function cached<T>(
  key: string,
  getter: () => T | Promise<T>,
  transform?: Transformer,
  parse?: Parser
): Promise<T>;
