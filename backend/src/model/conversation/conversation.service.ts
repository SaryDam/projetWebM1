import {Injectable, Logger} from '@nestjs/common';
import {Conversation} from './conversation.model';
import {Message} from '../message/message.model';
import {UtilisateurService} from '../utilisateur/utilisateur.service';

@Injectable()
export class ConversationService {
    private readonly logger = new Logger(ConversationService.name);
    private conversations: Conversation[] = [];

    constructor(private readonly utilisateurService: UtilisateurService) {
    }

    findByUser(userId: string): Conversation[] {
        this.logger.log(`Finding conversations for user ID: ${userId}`);
        this.logger.log(`Conversations: ${JSON.stringify(this.conversations)}`);
        return this.conversations.filter(conversation =>
            conversation.participants.some(participant => participant.id === userId),
        );
    }

    createConversation(participantIds: string[]): Conversation {
        const participants = participantIds.map(id => {
            const user = this.utilisateurService.findById(id);
            if (!user) {
                throw new Error(`User with id ${id} not found`);
            }
            return user;
        });

        const newConversation: Conversation = {
            id: Date.now().toString(),
            participants,
        };
        this.conversations.push(newConversation);
        this.logger.log(`Created conversation: ${JSON.stringify(newConversation)}`);
        return newConversation;
    }

    findById(conversationId: string): Conversation {
        return this.conversations.find(conv => conv.id === conversationId);
    }

    addMessage(conversationId: string, message: Message): void {
        const conversation = this.findById(conversationId);
        if (conversation) {
            if (!conversation.messages) {
                conversation.messages = [];
            }
            conversation.messages.push(message);
            this.logger.log(`Added message to conversation ${conversationId}`);
        } else {
            this.logger.error(`Conversation with id ${conversationId} not found`);
            throw new Error(`Conversation with id ${conversationId} not found`);
        }
    }
}
