import { Injectable } from '@nestjs/common';
import { NewConversation} from "./dto/new-conversation";
import { ModifyConversation} from "./dto/modify-conversation";
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConversationService {
    constructor(private prisma: PrismaService) {}

    async create(
        newConversationInput: NewConversation,
        utilisateurId: number,
    ) {
        const userIdsSet = new Set<number>(newConversationInput.participantIds);
        userIdsSet.add(utilisateurId);

        const userIds = Array.from(userIdsSet);

        const conversation = await this.prisma.conversation.create({
            data: {
                users: {
                    connect: userIds.map((id) => ({ id })),
                },
            },
            include: {
                users: true,
                messages: true,
            },
        });

        return conversation;
    }

    async getConversations(userId: number) {
        return this.prisma.conversation.findMany({
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
    }

    findAll() {
        return `This action returns all conversations`;
    }

    findOne(id: number) {
        return `This action returns a #${id} conversation`;
    }

    update(id: number, modifyConversationInput: ModifyConversation) {
        return `This action updates a #${id} conversation`;
    }

    remove(id: number) {
        return `This action removes a #${id} conversation`;
    }
}