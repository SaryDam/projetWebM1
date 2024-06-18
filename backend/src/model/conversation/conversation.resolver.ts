import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {ConversationService} from './conversation.service';
import {Conversation} from './conversation.model';
import {UtilisateurService} from '../utilisateur/utilisateur.service';
import {Message} from '../message/message.model';

@Resolver(() => Conversation)
export class ConversationResolver {
    constructor(
        private readonly conversationService: ConversationService,
        private readonly utilisateurService: UtilisateurService,
    ) {
    }

    @Query(() => [Conversation])
    getConversations(@Args('userId') userId: string): Conversation[] {
        return this.conversationService.findByUser(userId);
    }

    @Mutation(() => Conversation)
    createConversation(
        @Args({name: 'participantIds', type: () => [String]}) participantIds: string[],
    ): Conversation {
        return this.conversationService.createConversation(participantIds);
    }

    @Mutation(() => Boolean)
    async sendMessage(
        @Args('conversationId') conversationId: string,
        @Args('authorId') authorId: string,
        @Args('contenu') contenu: string,
    ): Promise<boolean> {
        const auteur = this.utilisateurService.findById(authorId);
        if (!auteur) {
            throw new Error(`User with id ${authorId} not found`);
        }

        const newMessage: Message = {
            id: Date.now().toString(),
            auteur,
            contenu,
            dateEnvoi: new Date(),
            conversation: {id: conversationId} as Conversation,
        };

        // Log the message before adding it
        console.log(`Adding message: ${JSON.stringify(newMessage)}`);

        // Add the message to the conversation
        this.conversationService.addMessage(conversationId, newMessage);
        return true;
    }
}
