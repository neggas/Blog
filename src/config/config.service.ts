import { Logger } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import ENV from './config.constants';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export class ConfigService {
    public static instance: ConfigService;
    constructor(private env: { [k: string]: string | undefined }) {}
    public static getInstance(): ConfigService {
        if (!ConfigService.instance)
            try {
                ConfigService.instance = new ConfigService(
                    process.env,
                ).ensureValues([
                    ENV.DATABASE_HOST,
                    ENV.DATABASE_NAME,
                    ENV.DATABASE_PASS,
                    ENV.DATABASE_TYPE,
                    ENV.DATABASE_USER,
                ]);
                Logger.log('Created ConfigService Instance');
            } catch (error) {
                Logger.error(error.message);
                process.exit(1);
            }
        return ConfigService.instance;
    }
    private getValue(key: string) {
        const returnedValue = this.env[key];
        if (!returnedValue) {
            throw new Error(`Config error - error missing env.${key}`);
        }
        return returnedValue;
    }
    public ensureValues(keys: string[]) {
        keys.forEach((key) => this.getValue(key));
        return this;
    }
    public getPort() {
        return Number(this.getValue(ENV.DATABASE_PORT));
    }
    public getTypeOrmConfig = (): TypeOrmModuleOptions => ({
        type: this.getValue(ENV.DATABASE_TYPE) as any,
        host: this.getValue(ENV.DATABASE_HOST),
        port: this.getPort(),
        username: this.getValue(ENV.DATABASE_USER),
        password: this.getValue(ENV.DATABASE_PASS),
        database: this.getValue(ENV.DATABASE_NAME),
        entities: ['./dist/**/*.entity{.ts,.js}'],
        synchronize: false,
        dropSchema: false,
        logging: true,
        loggerLevel: 'error',
        migrationsTableName: 'migration',
        migrations: ['src/migration/*.js'],
        cli: {
            migrationsDir: 'src/migration',
            subscribersDir: 'src/subscriber',
        },
        ssl: false,
    });
}

const configService = ConfigService.getInstance().getTypeOrmConfig();

export default configService;
