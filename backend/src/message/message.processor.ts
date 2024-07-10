import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MessageService } from './message.service';
import {Inject} from "@nestjs/common";
import {PUB_SUB} from "../common/pub-sub.module";
import {PubSub} from "graphql-subscriptions";

@Processor('message-queue')
export class MessageProcessor {
  constructor(private messageService: MessageService,
              @Inject(PUB_SUB) private pubSub: PubSub) {}



  @Process('sendMessage')
  async handleSendMessage(job: Job) {
    const { userId, conversationId, content } = job.data;
    console.log('Processing job', job.data);

    // Créez le message dans la base de données
    const message = await this.messageService.prisma.message.create({
      data: {
        content,
        user: { connect: { id: userId } },
        conversation: { connect: { id: conversationId } },
      },
    });

    console.log('Message created', message);

    // Publiez l'événement de message ajouté
    await this.pubSub.publish('messageAdded', { messageAdded: message });

    this.messageService.resolveMessage(job.id.toString(), message);
  }
}
