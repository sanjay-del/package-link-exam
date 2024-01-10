import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { bipadPortalListener } from './bipadPortal.listener';

@Module({
  providers: [TaskService, bipadPortalListener],
})
export class TasksModule {}
