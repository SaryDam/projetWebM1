import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Conversation, User } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async createUser(email: string, name: string, password: string): Promise<User> {
    return this.prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
  }

  async getUserConversations(userId: number): Promise<Conversation[]> {
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
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }


}