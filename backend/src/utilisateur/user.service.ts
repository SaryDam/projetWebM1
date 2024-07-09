import { Injectable } from '@nestjs/common';
import { CreateUser} from "./dto/create-user";
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    create(createUserInput: CreateUser) {
        return this.prisma.user.create({
            data: {
                ...createUserInput,
            },
        });
    }

    findAll() {
        return this.prisma.user.findMany();
    }

    findOne(username: string) {
        return this.prisma.user.findUnique({ where: { username } });
    }
}