import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { GetUserService } from '../services/getUser.service';

describe('AppController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [GetUserService],
    }).compile();

    userController = app.get<UserController>(UserController);
  });

  describe('root', () => {
    it('should return a User', () => {
      expect(userController.getUser('1')).toBeDefined();
    });
  });
});
