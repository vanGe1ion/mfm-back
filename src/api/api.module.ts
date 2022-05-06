import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiResolver } from './api.resolver';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [ApiService, ApiResolver],
})
export class ApiModule {}
