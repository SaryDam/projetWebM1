import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bullmq';
import { MessageService } from './message.service';
import { ConversationService } from '../conversation/conversation.service';
import { Message } from './message.model';
import { Logger } from '@nestjs/common';

@Processor('message-queue')
export class MessageProcessor {
    private readonly logger = new Logger(MessageProcessor.name);

    constructor(
        private readonly messageService: MessageService,
        private readonly conversationService: ConversationService,
    ) {}

    @Process('sendMessage')
    async handleSendMessage(job: Job<Message>) {
        this.logger.log(`Traitement du job avec id ${job.id} et données : ${JSON.stringify(job.data)}`);
        const { data: message } = job;
        // Sauvegardez le message dans Redis
        await this.messageService.createMessage(message);
        // Ajoutez le message à la conversation
        this.conversationService.addMessage(message.conversation.id, message);
        this.logger.log(`Job avec id ${job.id} traité avec succès`);
    }
}
