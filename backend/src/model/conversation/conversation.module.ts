import { Module } from '@nestjs/common';
import { ConversationResolver } from './conversation.resolver';
import { ConversationService } from './conversation.service';
import { UtilisateurModule } from '../utilisateur/utilisateur.module';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [UtilisateurModule, MessageModule],
  providers: [ConversationResolver, ConversationService],
})
export class ConversationModule {}
