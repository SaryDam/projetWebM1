import {Module} from '@nestjs/common';
import {MessageResolver} from './message.resolver';
import {MessageService} from './message.service';
import {BullModule} from "@nestjs/bull";
import {SharedModule} from "../../redis/shared.module";
import {UtilisateurService} from "../utilisateur/utilisateur.service";

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'message-queue',
        }),
        SharedModule
    ],
    providers: [MessageResolver, MessageService, UtilisateurService],
    exports: [MessageService, UtilisateurService]
})
export class MessageModule {
}
