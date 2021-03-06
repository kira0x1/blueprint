import {readFileSync} from 'fs';
import {ClientOptions} from 'eris';
import {Configuration as LoggerOptions} from 'log4js';
import {ConnectionOptions} from 'typeorm';

interface BotOptions {
  token: string;
  prefix: string;
  options?: ClientOptions;
}

/**
 * The type interface for the bot configuration
 */
export interface Config {
  bot: BotOptions;
  developers: Array<string>;
  logging?: LoggerOptions;
  database?: ConnectionOptions;
}

export interface ParserOptions {
  parser?: Function;
  encoding?: BufferEncoding;
}

/**
 * Loads a JSON configuration file
 * @param path The path to a JSON configuration file
 * @param options Optional parser configuration
 */
export function loadConfig(path: string, options?: ParserOptions): Config {
  const data = readFileSync(path, {encoding: options?.encoding ?? 'utf-8'});
  return options?.parser?.(data) ?? JSON.parse(data);
}
