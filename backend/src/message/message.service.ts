import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Message } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async getMessage(id: number): Promise<Message> {
    return this.prisma.message.findUnique({ where: { id } });
  }


  async sendMessage(userId: number, conversationId: number, content: string): Promise<Message> {
    const message = await this.prisma.message.create({
      data: {
        userId,
        conversationId,
        content,
      },
      include: {
        user: true,
        conversation: true,
      },
    });
    return message;
  }
}
