import { Injectable } from '@nestjs/common';
import { Message } from './message.model';

@Injectable()
export class MessageService {
  private messages: Message[] = [];

  findByConversation(conversationId: string): Message[] {
    return this.messages.filter(message => message.conversation.id === conversationId);
  }

  createMessage(data: Partial<Message>): Message {
    const newMessage = {
      id: Date.now().toString(),
      ...data,
    } as Message;
    this.messages.push(newMessage);
    return newMessage;
  }
}
