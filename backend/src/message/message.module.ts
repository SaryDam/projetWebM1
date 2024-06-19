import { Module } from '@nestjs/common';
import { MessageService} from "./message.service";
import { MessageResolver} from "./message.resolver";
import { PrismaService } from 'src/prisma/prisma.service';
import { BullModule } from '@nestjs/bull';
import { MessageProducer} from "./message.producer";
import { MessageConsumer} from "./message.consumer";

@Module({
    providers: [
        MessageResolver,
        MessageService,
        PrismaService,
        MessageProducer,
        MessageConsumer
    ],
    imports: [
        BullModule.registerQueue({
            name: 'message-queue',
        }),
    ],
})
export class MessagesModule {}