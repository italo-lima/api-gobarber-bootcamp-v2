import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticatedUserService from './AuthenticatedUserService';
import CreateUserService from './CreateUserService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let authenticatedUserService: AuthenticatedUserService;

describe('Authenticared User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    authenticatedUserService = new AuthenticatedUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticated', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
    });

    const response = await authenticatedUserService.execute({
      email: 'john@email.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able authenticated with non existing user', async () => {
    await expect(
      authenticatedUserService.execute({
        email: 'john2@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticated with wrong password', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
    });

    expect(
      authenticatedUserService.execute({
        email: 'john@email.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
