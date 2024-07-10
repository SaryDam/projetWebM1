import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('health')
export class HealthProcessor {
  @Process('healthCheckJob')
  handleHealthCheckJob(job: Job) {
    console.log('Health check job executed:', job.data);
  }
}
