import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';
import { MessageProcessor } from './message.processor';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'message',
    }),
  ],
  providers: [MessageResolver, MessageService, MessageProcessor, PrismaService],
})
export class MessageModule {}
