import { Injectable } from '@nestjs/common';
import { Conversation } from './conversation.model';
import { Utilisateur } from '../utilisateur/utilisateur.model';
import { Message } from '../message/message.model';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { MessageService } from '../message/message.service';

@Injectable()
export class ConversationService {
  private conversations: Conversation[] = [];

  constructor(
    private utilisateurService: UtilisateurService,
    private messageService: MessageService,
  ) {}

  findByUser(userId: string): Conversation[] {
    return this.conversations.filter(conversation =>
      conversation.participants.some(participant => participant.id === userId)
    );
  }

  createConversation(participantIds: string[]): Conversation {
    const participants = participantIds.map(id => this.utilisateurService.findById(id));
    const newConversation = {
      id: Date.now().toString(),
      participants,
      messages: [],
      dernierMessage: '',
      dateDerniereMiseAJour: new Date(),
    } as Conversation;
    this.conversations.push(newConversation);
    return newConversation;
  }

  addMessage(conversationId: string, message: Message): Conversation {
    const conversation = this.conversations.find(convo => convo.id === conversationId);
    if (!conversation) {
      throw new Error(`Conversation with id ${conversationId} not found`);
    }
    this.messageService.createMessage(message);
    conversation.messages.push(message);
    conversation.dernierMessage = message.contenu;
    conversation.dateDerniereMiseAJour = new Date();
    return conversation;
  }
}
