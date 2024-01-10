import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { readFile } from 'fs/promises';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('getTest')
  getTest() {
    return this.appService.getTest();
  }

  @MessagePattern('getHydroData')
  async getHydroData(timestamp: string) {
    const res = await readFile(
      join(process.cwd(), 'db', `${timestamp}hydro.json`),
      { encoding: 'utf-8' },
    );
    return res;
  }
}
