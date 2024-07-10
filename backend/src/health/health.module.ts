import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { BullModule } from '@nestjs/bull';
import { HealthProcessor } from './health.processor';
import { HealthResolver } from './health.resolver';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'health',
    }),
  ],
  controllers: [HealthController],
  providers: [HealthProcessor, HealthResolver],
})
export class HealthModule {}
