import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { MessageService} from "./message.service";
import { Message} from "./model/message.model";
import { CreateMessage} from "./dto/create-message";
import { UpdateMessage} from "./dto/update-message";
import { MessageProducer} from "./message.producer";
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard} from "../auth/guard/jwt-auth";
import { GraphQLContext} from "../interface/graphql-context.interface";
import { SendMessage} from "./dto/send-message";

@Resolver(() => Message)
export class MessageResolver {
    constructor(private readonly messagesService: MessageService) {}

    @Mutation(() => String)
    @UseGuards(JwtAuthGuard)
    async createMessage(
        @Args('createMessageInput') sendMessageInput: SendMessage,
        @Context() context: GraphQLContext,
    ) {
        const createMessageInput: CreateMessage = {
            content: sendMessageInput.content,
            userId: context.req.user.userId,
            conversationId: sendMessageInput.conversationId,
        };

        await this.messagesService.queueMessage(createMessageInput);

        return 'Message queued successfully';
    }

    @Query(() => [Message])
    @UseGuards(JwtAuthGuard)
    async getMessages(
        @Args('conversationId', { type: () => Int }) conversationId: number,
    ) {
        return this.messagesService.getMessages(conversationId);
    }

    @Query(() => [Message], { name: 'messages' })
    findAll() {
        return this.messagesService.findAll();
    }

    @Query(() => Message, { name: 'message' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.messagesService.findOne(id);
    }

    @Mutation(() => Message)
    updateMessage(
        @Args('updateMessageInput') updateMessageInput: UpdateMessage,
    ) {
        return this.messagesService.update(
            updateMessageInput.id,
            updateMessageInput,
        );
    }

    @Mutation(() => Message)
    removeMessage(@Args('id', { type: () => Int }) id: number) {
        return this.messagesService.remove(id);
    }
}