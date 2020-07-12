"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));

var _UpdateUserAvatarService = _interopRequireDefault(require("./UpdateUserAvatarService"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let diskStorageProvider;
let updateStorageService;
describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    diskStorageProvider = new _FakeStorageProvider.default();
    updateStorageService = new _UpdateUserAvatarService.default(fakeUsersRepository, diskStorageProvider);
  });
  it('should be able to update user avatar ', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456'
    });
    await updateStorageService.execute({
      user_id: user.id,
      avatarFileName: 'avatar.png'
    });
    expect(user.avatar).toBe('avatar.png');
  });
  it('should not be able to update user avatar from non existing user', async () => {
    await expect(updateStorageService.execute({
      user_id: 'non-existing-user',
      avatarFileName: 'avatar.png'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should delete old avatar when updating new one', async () => {
    //espionando a função deleteFile, para verificar se ela executou
    const deleteFile = jest.spyOn(diskStorageProvider, 'deleteFile');
    const updateStorageService = new _UpdateUserAvatarService.default(fakeUsersRepository, diskStorageProvider);
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456'
    });
    await updateStorageService.execute({
      user_id: user.id,
      avatarFileName: 'avatar.png'
    });
    await updateStorageService.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.png'
    });
    expect(deleteFile).toHaveBeenCalledWith('avatar.png');
    expect(user.avatar).toBe('avatar2.png');
  });
});