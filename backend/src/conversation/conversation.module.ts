import { Module } from '@nestjs/common';
import { ConversationResolver } from './conversation.resolver';
import { ConversationService } from './conversation.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [ConversationResolver, ConversationService, PrismaService],
})
export class ConversationModule {}
