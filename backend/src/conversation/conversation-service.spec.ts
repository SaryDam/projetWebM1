import { Test, TestingModule } from '@nestjs/testing';
import { ConversationService} from "./conversation.service";
import { PrismaService} from "../prisma/prisma.service";
import { NewConversation} from "./dto/new-conversation";

describe('ConversationService', () => {
    let service: ConversationService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ConversationService,
                {
                    provide: PrismaService,
                    useValue: {
                        conversation: {
                            create: jest.fn(),
                            findMany: jest.fn(),
                        },
                    },
                },
            ],
        }).compile();

        service = module.get<ConversationService>(ConversationService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a new conversation and return it', async () => {
            const createInput: NewConversation = { participantIds: [1, 2] };
            const result = {
                id: 1,
                createdAt: new Date(),
                users: [],
                messages: [],
            };

            jest.spyOn(prisma.conversation, 'create').mockResolvedValue(result);

            expect(await service.create(createInput, 1)).toEqual(result);
            expect(prisma.conversation.create).toHaveBeenCalledWith({
                data: {
                    users: {
                        connect: createInput.participantIds.map((id) => ({ id })),
                    },
                },
                include: {
                    users: true,
                    messages: true,
                },
            });
        });
    });

    describe('getConversations', () => {
        it('should return conversations for a given user', async () => {
            const userId = 1;
            const result = [
                { id: 1, createdAt: new Date(), users: [], messages: [] },
            ];

            jest.spyOn(prisma.conversation, 'findMany').mockResolvedValue(result);

            expect(await service.getConversations(userId)).toEqual(result);
            expect(prisma.conversation.findMany).toHaveBeenCalledWith({
                where: {
                    users: {
                        some: {
                            id: userId,
                        },
                    },
                },
                include: {
                    users: true,
                    messages: true,
                },
            });
        });
    });
});