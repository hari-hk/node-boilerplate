import { Connection, createConnection, getConnection } from 'typeorm';
import { logError, logSuccess, logWarning } from '../utils/logger';
import ORMConfig from './orm.config';

export const DBConnect = async () => {
    let connection: Connection | undefined;
    try {
        connection = getConnection();
    } catch (e) {
        logWarning('creating new database connection');
    }
    try {
        if (connection) {
            if (!connection.isConnected) {
                await connection.connect();
            }
        } else {
            await createConnection(ORMConfig);
        }
        logSuccess('🌴 Database connection was successful!');
    } catch (e) {
        logError('ERROR: Database connection failed!!', e);
        throw e;
    }
};

export const TryDBConnect = async (onError: Function) => {
    try {
        await DBConnect()
    } catch (e) {
        onError();
    }
};