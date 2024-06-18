import {Args, Mutation, Resolver} from '@nestjs/graphql';
import {MessageService} from './message.service';
import {Message} from './message.model';
import {ConversationService} from '../conversation/conversation.service';
import {UtilisateurService} from '../utilisateur/utilisateur.service';
import {Conversation} from "../conversation/conversation.model";
import {Logger} from "@nestjs/common";

@Resolver(() => Message)
export class MessageResolver {
    private readonly logger = new Logger(MessageResolver.name);

    constructor(
        private readonly messageService: MessageService,
        private readonly conversationService: ConversationService,
        private readonly utilisateurService: UtilisateurService,
    ) {
    }

    @Mutation(() => Boolean)
    async sendMessage(
        @Args('conversationId') conversationId: string,
        @Args('authorId') authorId: string,
        @Args('contenu') contenu: string,
    ): Promise<boolean> {
        this.logger.log(`sendMessage called with conversationId: ${conversationId}, authorId: ${authorId}, contenu: ${contenu}`);
        const auteur = this.utilisateurService.findById(authorId);
        if (!auteur) {
            throw new Error(`Utilisateur with id ${authorId} not found`);
        }

        const newMessage: Message = {
            id: Date.now().toString(),
            auteur,
            contenu,
            dateEnvoi: new Date(),
            conversation: {id: conversationId} as Conversation,
        };

        this.logger.log(`Adding message: ${JSON.stringify(newMessage)}`);

        this.conversationService.addMessage(conversationId, newMessage);
        return true;
    }
}
