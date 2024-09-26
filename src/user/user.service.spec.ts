import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const mockUserRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('UserService', () => {
  let service: UserService;
  let repository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository(),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Success scenario: Creating a new user
  it('should create a new user', async () => {
    const user = { firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'pass123' };
    repository.save.mockResolvedValue(user as any); // Mocking successful save
    const result = await service.create(user);
    expect(result).toEqual(user);
  });

  // Failure scenario: Creating a new user (repository fails)
  it('should fail to create a new user when save fails', async () => {
    const user = { firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'pass123' };
    repository.save.mockRejectedValue(new Error('Database error')); // Mocking failed save
    await expect(service.create(user)).rejects.toThrow('Database error');
  });

  // Success scenario: Returning all users
  it('should return all users', async () => {
    const users = [{ firstName: 'John', lastName: 'Doe' }];
    repository.find.mockResolvedValue(users as any); // Mocking successful find
    const result = await service.findAll();
    expect(result).toEqual(users);
  });

  // Failure scenario: Returning all users (repository fails)
  it('should fail to return users when find fails', async () => {
    repository.find.mockRejectedValue(new Error('Database error')); // Mocking failed find
    await expect(service.findAll()).rejects.toThrow('Database error');
  });

  // Success scenario: Returning a single user
  it('should return a single user', async () => {
    const user = { id: '1', firstName: 'John', lastName: 'Doe' };
    repository.findOne.mockResolvedValue(user as any); // Mocking successful findOne
    const result = await service.findOne('1');
    expect(result).toEqual(user);
  });

  // Failure scenario: User not found
  it('should throw NotFoundException when user is not found', async () => {
    repository.findOne.mockResolvedValue(null); // Mocking not found user
    await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
  });

  // Success scenario: Updating a user
  it('should update a user', async () => {
   
