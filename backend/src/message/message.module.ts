import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { MessageProcessor } from './message.processor';
import { PrismaService } from '../prisma.service';
import { PubSubModule } from '../common/pub-sub.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'message-queue',
    }),
    PubSubModule,
  ],
  providers: [MessageService, MessageResolver, MessageProcessor, PrismaService],
})
export class MessageModule {}
