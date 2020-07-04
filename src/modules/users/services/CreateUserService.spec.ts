import FakeUsersRepsitory from '../repositories/fakes/FakeUsersRepsitory';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';

describe('Create User', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepsitory = new FakeUsersRepsitory();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepsitory,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepsitory = new FakeUsersRepsitory();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepsitory,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
    });

    expect(
      createUserService.execute({
        name: 'John Doe2',
        email: 'john@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
