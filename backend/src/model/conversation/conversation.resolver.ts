import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ConversationService } from './conversation.service';
import { Conversation } from './conversation.model';
import { Message } from '../message/message.model';
import { UtilisateurService } from '../utilisateur/utilisateur.service';

@Resolver(() => Conversation)
export class ConversationResolver {
  constructor(
    private readonly conversationService: ConversationService,
    private readonly utilisateurService: UtilisateurService,
  ) {}

  @Query(() => [Conversation])
  getConversations(@Args('userId') userId: string): Conversation[] {
    return this.conversationService.findByUser(userId);
  }

  @Mutation(() => Conversation)
  createConversation(
    @Args({ name: 'participantIds', type: () => [String] }) participantIds: string[],
  ): Conversation {
    return this.conversationService.createConversation(participantIds);
  }

  @Mutation(() => Conversation)
  sendMessage(
    @Args('conversationId') conversationId: string,
    @Args('authorId') authorId: string,
    @Args('contenu') contenu: string,
  ): Conversation {
    const auteur = this.utilisateurService.findById(authorId);
    if (!auteur) {
      throw new Error(`Utilisateur with id ${authorId} not found`);
    }
    const newMessage = {
      id: Date.now().toString(),
      auteur: { id: authorId, nom: auteur.nom },
      contenu,
      dateEnvoi: new Date(),
      conversation: { id: conversationId } as Conversation,
    } as Message;
    return this.conversationService.addMessage(conversationId, newMessage);
  }
}
