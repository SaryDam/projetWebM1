import { Test, TestingModule } from '@nestjs/testing';
import { MessageService} from "./message.service";
import { PrismaService} from "../prisma/prisma.service";

describe('MessageService', () => {
    let service: MessageService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MessageService, PrismaService],
        }).compile();

        service = module.get<MessageService>(MessageService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('sendMessage', () => {
        it('should save a message', async () => {
            const sendMessageInput = {
                content: 'Hello, world!',
                userId: 1,
                conversationId: 1,
            };

            prisma.message.create = jest.fn().mockReturnValue({
                id: 1,
                content: 'Hello, world!',
                createdAt: new Date(),
                authorId: 1,
                conversationId: 1,
            });

            const message = await service.saveMessage(sendMessageInput);

            expect(message).toBeDefined();
            expect(message.content).toBe('Hello, world!');
            expect(prisma.message.create).toHaveBeenCalledWith({
                data: {
                    content: 'Hello, world!',
                    author: {
                        connect: { id: 1 },
                    },
                    conversation: {
                        connect: { id: 1 },
                    },
                },
                include: {
                    author: true,
                    conversation: true,
                },
            });
        });
    });
});