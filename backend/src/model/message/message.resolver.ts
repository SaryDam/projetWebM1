import {Resolver, Mutation, Args, Query} from '@nestjs/graphql';
import {MessageService} from './message.service';
import {Message} from './message.model';
import {InjectQueue} from '@nestjs/bull';
import {Queue} from 'bullmq';
import {Logger} from '@nestjs/common';
import {UtilisateurService} from "../utilisateur/utilisateur.service";

@Resolver(() => Message)
export class MessageResolver {
    private readonly logger = new Logger(MessageResolver.name);

    constructor(
        private readonly messageService: MessageService,
        private readonly utilisateurService: UtilisateurService,
        @InjectQueue('message-queue') private readonly messageQueue: Queue,
    ) {
    }

    @Query(() => [Message])
    async getMessages(@Args('conversationId') conversationId: string): Promise<Message[]> {
        this.logger.log(`Récupération des messages pour la conversation ${conversationId}`);
        return this.messageService.getMessages(conversationId);
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
            throw new Error(`Utilisateur with id ${authorId} not found`);
        }
        const newMessage = {
            id: Date.now().toString(),
            auteur: {id: authorId, nom: auteur.nom},
            contenu,
            dateEnvoi: new Date(),
            conversation: {id: conversationId},
        } as Message;

        // Ajoutez le message à la queue
        await this.messageQueue.add('sendMessage', newMessage);
        this.logger.log(`Message ajouté à la file d'attente avec les données : ${JSON.stringify(newMessage)}`);
        return true;
    }
}
