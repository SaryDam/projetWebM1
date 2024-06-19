import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bullmq';
import { MessageService } from './message.service';
import { CreateMessage } from './dto/create-message';

@Processor('message-queue')
export class MessageProcessor {
    constructor(private readonly messageService: MessageService) {}

    @Process('send-message-job')
    async handleSendMessage(job: Job<CreateMessage>) {
        await this.messageService.saveMessage(job.data);
    }
}
