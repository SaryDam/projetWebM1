import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Conversation, Message } from "@prisma/client";

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  async getConversation(id: number): Promise<Conversation> {
    return this.prisma.conversation.findUnique({ where: { id } });
  }

  async createConversation(userIds: number[], name: string): Promise<Conversation> {
    return this.prisma.conversation.create({
      data: {
        name,
        users: {
          connect: userIds.map(id => ({ id })),
        },
      },
    });
  }

  async getConversationMessages(conversationId: number): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: {
        conversationId,
      },
      include: {
        user: true,
      },
    });
  }
}
