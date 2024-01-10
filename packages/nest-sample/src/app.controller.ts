import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('Service_A') private readonly clientA: ClientProxy,
  ) {}

  @Get('/testing')
  async getTest(): Promise<string> {
    const resultA = await this.clientA.send('getTest', '').toPromise();
    return this.appService.getTest(resultA);
  }
  @Get('/hydro')
  async getHydro() {
    const jsonData = await this.clientA
      .send('getHydroData', '1704699726196')
      .toPromise();
    console.log(jsonData);
    return this.appService.getHydro();
  }
}
