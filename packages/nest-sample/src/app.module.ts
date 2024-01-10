import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { PrismaModule, PrismaService } from '@rahat/prisma';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'Service_A',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 4000,
        },
      },
    ]),
    // PrismaModule,
    // PrismaService,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
