import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ConversationService} from "./conversation.service";
import { Conversation} from "./model/conversation.model";
import { NewConversation} from "./dto/new-conversation";
import { ModifyConversation} from "./dto/modify-conversation";
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard} from "../auth/guard/jwt-auth";
import { GraphQLContext} from "../interface/graphql-context.interface";

@Resolver(() => Conversation)
export class ConversationResolver {
    constructor(private readonly conversationService: ConversationService) {}

    @Mutation(() => Conversation)
    @UseGuards(JwtAuthGuard)
    createConversation(
        @Args('newConversation')
            newConversation: NewConversation,
        @Context() context: GraphQLContext,
    ) {
        return this.conversationService.create(
            newConversation,
            context.req.user.userId,
        );
    }

    @Query(() => [Conversation])
    @UseGuards(JwtAuthGuard)
    async getConversations(@Context() context: GraphQLContext) {
        return this.conversationService.getConversations(context.req.user.userId);
    }

    @Query(() => [Conversation], { name: 'conversations' })
    findAll() {
        return this.conversationService.findAll();
    }

    @Query(() => Conversation, { name: 'conversation' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.conversationService.findOne(id);
    }

    @Mutation(() => Conversation)
    updateConversation(
        @Args('updateConversationInput')
            modifyConversation: ModifyConversation,
    ) {
        return this.conversationService.update(
            modifyConversation.conversationId,
            modifyConversation,
        );
    }

    @Mutation(() => Conversation)
    removeConversation(@Args('id', { type: () => Int }) id: number) {
        return this.conversationService.remove(id);
    }
}