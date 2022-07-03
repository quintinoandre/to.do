import {
	CreateUserDTO,
	DeleteUserDTO,
	FindUserDTO,
	UpdateUserDTO,
} from '../dtos';
import { IUserEntity } from '../entities';

interface IUsersRepository {
	create(data: CreateUserDTO): Promise<IUserEntity>;
	delete(data: DeleteUserDTO): Promise<void>;
	findByEmail(email: string): Promise<IUserEntity>;
	findById(data: FindUserDTO): Promise<IUserEntity>;
	findAll(): Promise<IUserEntity[]>;
	update(id: string, data: UpdateUserDTO): Promise<IUserEntity>;
}

export { IUsersRepository };
