import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { MessageService } from './message.service';
import { Message } from '@prisma/client';

@Processor('message')
export class MessageProcessor {
  constructor(private messageService: MessageService) {}

  @Process('sendMessage')
  async handleSendMessage(job: Job): Promise<Message> {
    const { userId, conversationId, content } = job.data;
    const message = await this.messageService.sendMessage(userId, conversationId, content);
    return message;
  }
}
