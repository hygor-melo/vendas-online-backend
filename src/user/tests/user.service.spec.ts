import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userEntityMock } from '../mocks/user.mock';
import { error } from 'console';
import { createUserMock } from '../mocks/createUser.mock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntityMock),
            save: jest.fn().mockResolvedValue(userEntityMock),
          }
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    )
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should return user in findUserByEmail', async () => {
    const user = await service.findUserByEmail(userEntityMock.email);

    expect(user).toEqual(userEntityMock);
  });

  it('should return error user in findUserByEmail', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.findUserByEmail(userEntityMock.email),
    ).rejects.toThrowError();
  });

  it('should return error user in findUserByEmail (error DB)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

    expect(
      service.findUserByEmail(userEntityMock.email),
    ).rejects.toThrowError();
  });

  it('should return user in findUserById', async () => {
    const user = await service.findUserById(userEntityMock.id);

    expect(user).toEqual(userEntityMock);
  });

  it('should return error user in findUserById', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.findUserById(userEntityMock.id),
    ).rejects.toThrowError();
  });

  it('should return error user in findUserById (error DB)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

    expect(
      service.findUserById(userEntityMock.id),
    ).rejects.toThrowError();
  });

  it('should return user in getUserByIdUsingRelations', async () => {
    const user = await service.getUserByIdUsingRelations(userEntityMock.id);

    expect(user).toEqual(userEntityMock);
  });

  it('should return error if user exists', async () => {    

    expect(service.createUser(createUserMock)).rejects.toThrowError();
  });

  it('should return user if user not exists', async () => {    
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

    const user = await service.createUser(createUserMock);

    expect(user).toEqual(userEntityMock);
  });
});
