import { Module } from '@nestjs/common';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { Producer } from '@nestjs/microservices/external/kafka.interface';

import { UserController } from './controllers/user.controller';

import { GetUserService } from './services/getUser.service';
import { CreateUserService } from './services/createUser.service';
import { ListUserService } from './services/listUser.service';
import { UpdateUserService } from './services/updateUser.service';
import { DeleteUserService } from './services/deleteUser.service';
import { UserRepository } from './core/repositories/user.repository';
import { UserRemoteRepository } from './data/remote/userRemote.repository';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'user-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    GetUserService,
    CreateUserService,
    ListUserService,
    UpdateUserService,
    DeleteUserService,
    {
      provide: UserRepository,
      useClass: UserRemoteRepository,
    },
    {
      provide: 'KAFKA_PRODUCER',
      useFactory: async (kafkaService: ClientKafka): Promise<Producer> => {
        return kafkaService.connect();
      },
      inject: ['KAFKA_SERVICE'],
    },
  ],
})
export class AppModule {}
