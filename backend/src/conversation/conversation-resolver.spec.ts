import { Test, TestingModule } from '@nestjs/testing';
import { ConversationResolver} from "./conversation.resolver";
import { ConversationService} from "./conversation.service";
import { NewConversation} from "./dto/new-conversation";
import { GraphQLContext} from "../interface/graphql-context.interface";

describe('ConversationResolver', () => {
    let resolver: ConversationResolver;
    let service: ConversationService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ConversationResolver,
                {
                    provide: ConversationService,
                    useValue: {
                        create: jest.fn(),
                        getConversations: jest.fn(),
                    },
                },
            ],
        }).compile();

        resolver = module.get<ConversationResolver>(ConversationResolver);
        service = module.get<ConversationService>(ConversationService);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('createConversation', () => {
        it('should call service.create and return the result', async () => {
            const createInput: NewConversation = { participantIds: [1, 2] };
            const result = {
                id: 1,
                createdAt: new Date(),
                users: [],
                messages: [],
            };

            const context: GraphQLContext = {
                req: {
                    user: {
                        userId: 1,
                        username: '',
                    },
                },
            };

            jest.spyOn(service, 'create').mockResolvedValue(result);

            expect(await resolver.createConversation(createInput, context)).toEqual(
                result,
            );
            expect(service.create).toHaveBeenCalledWith(
                createInput,
                context.req.user.userId,
            );
        });
    });

    describe('getConversations', () => {
        it('should call service.getConversations and return the result', async () => {
            const userId = 1;
            const result = [
                { id: 1, createdAt: new Date(), users: [], messages: [] },
            ];

            const context: GraphQLContext = {
                req: {
                    user: {
                        userId: userId,
                        username: '',
                    },
                },
            };

            jest.spyOn(service, 'getConversations').mockResolvedValue(result);

            expect(await resolver.getConversations(context)).toEqual(result);
            expect(service.getConversations).toHaveBeenCalledWith(userId);
        });
    });
});