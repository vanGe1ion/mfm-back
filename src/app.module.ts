import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.PG_CONNECTION_URL,
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
      migrations: ['dist/migrations/*.js'],
      cli: {
        migrationsDir: 'src/migrations',
      },
    }),
  ],
})
export class AppModule {}
