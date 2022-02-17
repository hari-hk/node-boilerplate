import chalk from 'chalk';

// tslint:disable-next-line: no-console
const log = console.log;

export const logger = (key: string, value?: any) => {
  return log(key, value || '');
};
export const logSuccess = (key: string, value?: any) => {
  return log(chalk.green(key), value || '');
};
export const logWarning = (key: string, value?: any) => {
  const warning = chalk.hex('#FFA500'); // Orange color
  return log(warning(key), value || '');
};
export const logError = (key: string, value?: any) => {
  return log(chalk.red(key), value || '');
};
export const logInfo = (key: string, value?: any) => {
  return log(chalk.blue(key), value || '');
};
