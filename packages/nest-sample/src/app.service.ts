import { Injectable } from '@nestjs/common';
// import { PrismaService } from '@rahat/prisma';

@Injectable()
export class AppService {
  // constructor(private prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }
  // async getData() {
  //   const d = await this.prisma.category.findMany();
  //   return { message: 'Hello API', data: d };
  // }
  getTest(serviceA: string) {
    return `From test microservice ${serviceA}`;
  }
  getHydro() {
    return 'Received data from microservice';
  }
}
