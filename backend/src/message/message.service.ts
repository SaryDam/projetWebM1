import { Injectable } from '@nestjs/common';
import { CreateMessage} from "./dto/create-message";
import { UpdateMessage} from "./dto/update-message";
import { PrismaService } from '../prisma/prisma.service';
import {MessageProducer} from "./message.producer";

@Injectable()
export class MessageService {
    constructor(private prisma: PrismaService,
                private messageProducer: MessageProducer) {}

    async create(createMessageInput: CreateMessage) {
        const { content, userId, conversationId } = createMessageInput;

        const message = await this.prisma.message.create({
            data: {
                content,
                author: {
                    connect: { id: userId },
                },
                conversation: {
                    connect: { id: conversationId },
                },
            },
            include: {
                author: true,
                conversation: true,
            },
        });

        return message;
    }

    async saveMessage(data: CreateMessage) {
        const { content, userId, conversationId } = data;

        const message = await this.prisma.message.create({
            data: {
                content,
                author: {
                    connect: { id: userId },
                },
                conversation: {
                    connect: { id: conversationId },
                },
            },
            include: {
                author: true,
                conversation: true,
            },
        });

        return message;
    }

    async queueMessage(data: CreateMessage) {
        await this.messageProducer.addMessageToQueue(data);
    }

    async getMessages(conversationId: number) {
        return this.prisma.message.findMany({
            where: {
                conversationId,
            },
            include: {
                author: true,
                conversation: true,
            },
        });
    }

    findAll() {
        return `This action returns all messages`;
    }

    findOne(id: number) {
        return `This action returns a #${id} message`;
    }

    update(id: number, updateMessageInput: UpdateMessage) {
        return `This action updates a #${id} message`;
    }

    remove(id: number) {
        return `This action removes a #${id} message`;
    }
}