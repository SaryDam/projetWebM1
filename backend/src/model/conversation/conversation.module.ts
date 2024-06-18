import {Module} from '@nestjs/common';
import {ConversationResolver} from './conversation.resolver';
import {ConversationService} from './conversation.service';
import {UtilisateurModule} from '../utilisateur/utilisateur.module';
import {MessageModule} from '../message/message.module';
import {BullModule} from "@nestjs/bull";
import {MessageProcessor} from "../message/message.processor";

@Module({
    imports: [
        UtilisateurModule,
        MessageModule,
        BullModule.registerQueue({
            name: ("message-queue"),
        }),
    ],
    providers: [ConversationResolver, ConversationService, MessageProcessor],
})
export class ConversationModule {
}
