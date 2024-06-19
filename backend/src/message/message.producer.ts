import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CreateMessage} from "./dto/create-message";

@Injectable()
export class MessageProducer {
    constructor(@InjectQueue('message-queue') private messageQueue: Queue) {}

    async addMessageToQueue(createMessageInput: CreateMessage) {
        await this.messageQueue.add('send-message-job', createMessageInput);
    }
}