import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const ormconfig: PostgresConnectionOptions = {
  type: 'postgres',
  url: process.env.PG_CONNECTION_URL,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: true,
  migrations: ['dist/src/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default ormconfig;
