import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeDiskStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserService from './UpdateUserAvatarService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let diskStorageProvider: FakeDiskStorageProvider;
let updateStorageService: UpdateUserService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    diskStorageProvider = new FakeDiskStorageProvider();
    updateStorageService = new UpdateUserService(
      fakeUsersRepository,
      diskStorageProvider,
    );
  });

  it('should be able to update user avatar ', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
    });

    await updateStorageService.execute({
      user_id: user.id,
      avatarFileName: 'avatar.png',
    });

    expect(user.avatar).toBe('avatar.png');
  });

  it('should not be able to update user avatar from non existing user', async () => {
    await expect(
      updateStorageService.execute({
        user_id: 'non-existing-user',
        avatarFileName: 'avatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    //espionando a função deleteFile, para verificar se ela executou
    const deleteFile = jest.spyOn(diskStorageProvider, 'deleteFile');

    const updateStorageService = new UpdateUserService(
      fakeUsersRepository,
      diskStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
    });

    await updateStorageService.execute({
      user_id: user.id,
      avatarFileName: 'avatar.png',
    });

    await updateStorageService.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.png',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.png');
    expect(user.avatar).toBe('avatar2.png');
  });
});
