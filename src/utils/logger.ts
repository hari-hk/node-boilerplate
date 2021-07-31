import chalk from 'chalk';

// tslint:disable-next-line: no-console
const log = console.log

export const logger = (key: string, value?: number | string) => {
    return log(key, value || '');
}
export const loggerSuccess = (key: string, value?: number | string) => {
    return log(chalk.green(key), value || '');
}
export const loggerWarning = (key: string, value?: number | string) => {
    const warning = chalk.hex('#FFA500'); // Orange color
    return log(warning(key), value || '');
}
export const loggerError = (key: string, value?: number | string) => {
    return log(chalk.red(key), value || '');
}
export const loggerInfo = (key: string, value?: number | string) => {
    return log(chalk.blue(key), value || '');
}