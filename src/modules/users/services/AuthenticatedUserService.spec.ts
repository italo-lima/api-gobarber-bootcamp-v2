import FakeUsersRepsitory from '../repositories/fakes/FakeUsersRepsitory';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticatedUserService from './AuthenticatedUserService';
import CreateUserService from './CreateUserService';

import AppError from '@shared/errors/AppError';

describe('Authenticared User', () => {
  it('should be able to authenticated', async () => {
    const fakeUsersRepsitory = new FakeUsersRepsitory();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepsitory,
      fakeHashProvider,
    );

    const authenticatedUserService = new AuthenticatedUserService(
      fakeUsersRepsitory,
      fakeHashProvider,
    );

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
    const fakeUsersRepsitory = new FakeUsersRepsitory();
    const fakeHashProvider = new FakeHashProvider();

    const authenticatedUserService = new AuthenticatedUserService(
      fakeUsersRepsitory,
      fakeHashProvider,
    );

    expect(
      authenticatedUserService.execute({
        email: 'john2@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticated with wrong password', async () => {
    const fakeUsersRepsitory = new FakeUsersRepsitory();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepsitory,
      fakeHashProvider,
    );

    const authenticatedUserService = new AuthenticatedUserService(
      fakeUsersRepsitory,
      fakeHashProvider,
    );

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
