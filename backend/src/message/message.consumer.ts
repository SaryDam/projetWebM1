import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MessageService} from "./message.service";
import { CreateMessage} from "./dto/create-message";

@Processor('message-queue')
export class MessageConsumer {
    constructor(private readonly messageService: MessageService) {}

    @Process('send-message-job')
    async handleSendMessageJob(job: Job<CreateMessage>) {
        const { data } = job;
        await this.messageService.saveMessage(data);
    }
}