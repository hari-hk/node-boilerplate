import { config as configDotenv } from 'dotenv'
import { resolve } from 'path'

switch (process.env.NODE_ENV || 'development') {
    case 'development':
        configDotenv({
            path: resolve(__dirname, '../../.env')
        })
        break
    case 'production':
        configDotenv({
            path: resolve(__dirname, '../../.env.production')
        })
        break
    default:
        throw new Error(`'NODE_ENV' ${process.env.NODE_ENV} is not handled!`)
}