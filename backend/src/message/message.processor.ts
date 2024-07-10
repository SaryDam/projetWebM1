import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MessageService } from './message.service';

@Processor('message-queue')
export class MessageProcessor {
  constructor(private messageService: MessageService) {}

  @Process('sendMessage')
  async handleSendMessage(job: Job) {
    const { userId, conversationId, content } = job.data;
    console.log('Processing job', job.data);

    // Assurez-vous que cette ligne ne crée pas de nouvelle entrée dans la queue
    const message = await this.messageService.prisma.message.create({
      data: {
        content,
        user: { connect: { id: userId } },
        conversation: { connect: { id: conversationId } },
      },
    });

    console.log('Message created', message);
  }
}
