import { Controller, Get } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('health')
export class HealthController {
  constructor(@InjectQueue('health') private readonly healthQueue: Queue) {}

  @Get()
  async healthCheck(): Promise<string> {
    await this.healthQueue.add('check', {
      timestamp: new Date().toISOString(),
    });
    return 'OK';
  }
}
