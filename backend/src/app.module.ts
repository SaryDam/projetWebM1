import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UtilisateurModule } from './model/utilisateur/utilisateur.module';
import { ConversationModule } from './model/conversation/conversation.module';
import { MessageModule } from './model/message/message.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UtilisateurModule,
    ConversationModule,
    MessageModule,
  ],
})
export class AppModule {}
