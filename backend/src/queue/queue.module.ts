import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueProcessor } from './queue.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'health',
    }),
  ],
  providers: [QueueProcessor],
  exports : [BullModule]
})
export class QueueModule {}
