// Arquivo que controla a injeção de dependências
import { container } from 'tsyringe';

import '@modules/users/providers/HashProvider'; // Adicionando injeção do hashProvider

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

// registra a passagem desse repositório ao chamar a key AppointmentRepository
container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  AppointmentRepository,
);

container.registerSingleton<IUsersRepository>('UserRepository', UserRepository);
