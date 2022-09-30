import { Response } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  KafkaMessage,
  Producer,
} from '@nestjs/microservices/external/kafka.interface';

import { GetUserService } from '../services/getUser.service';
import { CreateUserService } from '../services/createUser.service';
import { ListUserService } from '../services/listUser.service';
import { UpdateUserService } from '../services/updateUser.service';
import { DeleteUserService } from '../services/deleteUser.service';
import { CreateUserDTO } from '../shared/dtos/users/createUser.dto';
import { UpdateUserDTO } from '../shared/dtos/users/updateUser.dto';
import { CreatedUserDTO } from '../shared/dtos/users/createdUser.dto';
import { UpdatedUserDTO } from '../shared/dtos/users/updatedUser.dto';
import { RetrievedUserDTO } from '../shared/dtos/users/retrievedUser.dto';

@Controller()
export class UserController {
  constructor(
    private readonly getUserService: GetUserService,
    private readonly createUserService: CreateUserService,
    private readonly listUserService: ListUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService,
    @Inject('KAFKA_PRODUCER')
    private kafkaProducer: Producer,
  ) {}

  @Get('/user/:userId')
  async getUser(@Param('userId') userId: number): Promise<RetrievedUserDTO> {
    return this.getUserService.execute(userId);
  }

  @Get('/users')
  async listUsers(): Promise<RetrievedUserDTO[]> {
    return this.listUserService.execute();
  }

  @Post('/user')
  async createUser(@Body() user: CreateUserDTO): Promise<CreatedUserDTO> {
    const createdUser = await this.createUserService.execute(user);
    await this.kafkaProducer.send({
      topic: 'USER_CREATED',
      messages: [
        {
          key: createdUser.id.toString(),
          value: JSON.stringify(createdUser),
        },
      ],
    });
    return createdUser;
  }

  @Put('/user/:userId')
  async updateUser(
    @Param('userId') userId: number,
    @Body() user: UpdateUserDTO,
  ): Promise<UpdatedUserDTO> {
    return this.updateUserService.execute(userId, user);
  }

  @Delete('/user/:userId')
  async deleteUser(
    @Param('userId') userId: number,
    @Res() response: Response,
  ): Promise<Response> {
    await this.deleteUserService.execute({ id: userId });
    return response.status(200).send({ message: 'User deleted' });
  }

  @MessagePattern('USER_CREATED')
  consumer(@Payload() message: KafkaMessage): void {
    console.log(message);
  }
}
