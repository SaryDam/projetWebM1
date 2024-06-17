import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';

@Processor('health')
export class QueueProcessor {
  private readonly logger = new Logger(QueueProcessor.name);

  @Process('check')
  async handleHealthCheck(job: Job) {
    this.logger.log(`Processing job ${job.id}`);
    return {};
  }
}
