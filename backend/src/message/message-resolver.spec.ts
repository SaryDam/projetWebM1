import { Test, TestingModule } from '@nestjs/testing';
import { MessageResolver} from "./message.resolver";
import { MessageService} from "./message.service";
import { MessageProducer} from "./message.producer";
import { GraphQLContext} from "../interface/graphql-context.interface";

describe('MessageResolver', () => {
    let resolver: MessageResolver;
    let messagesProducer: MessageProducer;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageResolver,
                {
                    provide: MessageService,
                    useValue: {
                        saveMessage: jest.fn(),
                    },
                },
                {
                    provide: MessageProducer,
                    useValue: {
                        addMessageToQueue: jest.fn(),
                    },
                },
            ],
        }).compile();

        resolver = module.get<MessageResolver>(MessageResolver);
        messagesProducer = module.get<MessageProducer>(MessageProducer);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('sendMessage', () => {
        it('should add message to queue', async () => {
            const sendMessageInput = {
                content: 'Hello, world!',
                userId: 1,
                conversationId: 1,
            };

            const context: GraphQLContext = {
                req: {
                    user: {
                        userId: 1,
                        username: '',
                    },
                },
            };

            await resolver.createMessage(sendMessageInput, context);

            expect(messagesProducer.addMessageToQueue).toHaveBeenCalledWith(
                sendMessageInput,
            );
        });

        it('should return confirmation message', async () => {
            const sendMessageInput = {
                content: 'Hello, world!',
                userId: 1,
                conversationId: 1,
            };

            const context: GraphQLContext = {
                req: {
                    user: {
                        userId: 1,
                        username: '',
                    },
                },
            };

            const result = await resolver.createMessage(sendMessageInput, context);

            expect(result).toBe('Message queued successfully');
        });
    });
});