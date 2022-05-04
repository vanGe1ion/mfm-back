module.exports = {
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
