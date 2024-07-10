import { Controller, Get } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('health')
export class HealthController {
  constructor(@InjectQueue('health') private healthQueue: Queue) {}

  @Get()
  async getHealthCheck(): Promise<string> {
    await this.healthQueue.add('healthCheckJob', {
      timestamp: new Date().toISOString(),
    });
    return 'OK';
  }
}
