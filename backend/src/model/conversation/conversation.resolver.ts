import {Resolver, Mutation, Args, Query} from '@nestjs/graphql';
import {ConversationService} from './conversation.service';
import {Conversation} from './conversation.model';
import {Message} from '../message/message.model';
import {UtilisateurService} from '../utilisateur/utilisateur.service';
import {InjectQueue} from '@nestjs/bull';
import {Queue} from 'bullmq';
import {Logger} from '@nestjs/common';

@Resolver(() => Conversation)
export class ConversationResolver {
    private readonly logger = new Logger(ConversationResolver.name);

    constructor(
        private readonly conversationService: ConversationService,
        private readonly utilisateurService: UtilisateurService,
        @InjectQueue('message-queue') private readonly messageQueue: Queue,
    ) {
    }

    @Query(() => [Conversation])
    getConversations(@Args('userId') userId: string): Conversation[] {
        return this.conversationService.findByUser(userId);
    }

    @Mutation(() => Conversation)
    async createConversation(
        @Args({name: 'participantIds', type: () => [String]}) participantIds: string[],
    ): Promise<Conversation> {
        this.logger.log(`Création d'une conversation avec les participants ${participantIds}`);
        return this.conversationService.createConversation(participantIds);
    }

    @Mutation(() => Boolean)
    async sendMessage(
        @Args('conversationId') conversationId: string,
        @Args('authorId') authorId: string,
        @Args('contenu') contenu: string,
    ): Promise<boolean> {
        this.logger.log(`Réception de la demande d'envoi de message pour la conversation ${conversationId} de l'auteur ${authorId}`);

        const auteur = this.utilisateurService.findById(authorId);
        if (!auteur) {
            this.logger.error(`Utilisateur avec id ${authorId} non trouvé`);
            throw new Error(`Utilisateur avec id ${authorId} non trouvé`);
        }

        const newMessage = {
            id: Date.now().toString(),
            auteur: {id: authorId, nom: auteur.nom},
            contenu,
            dateEnvoi: new Date(),
            conversation: {id: conversationId} as Conversation,
        } as Message;

        // Ajoutez le message à la queue
        await this.messageQueue.add('sendMessage', newMessage);
        this.logger.log(`Message ajouté à la file d'attente avec les données : ${JSON.stringify(newMessage)}`);
        return true;
    }
}
