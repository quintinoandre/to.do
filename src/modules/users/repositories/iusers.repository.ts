import {
	CreateUserDTO,
	DeleteUserDTO,
	UpdateUserDTO,
	UpdateUserRolesDTO,
} from '../dtos';
import { IUserEntity } from '../entities';

interface IUsersRepository {
	create(data: CreateUserDTO): Promise<IUserEntity>;
	delete(data: DeleteUserDTO): Promise<void>;
	findByEmail(email: string): Promise<IUserEntity>;
	findById(id: string): Promise<IUserEntity>;
	findAll(): Promise<IUserEntity[]>;
	updateUser(id: string, data: UpdateUserDTO): Promise<IUserEntity>;
	updateUserRoles(id: string, roles: UpdateUserRolesDTO): Promise<IUserEntity>;
}

export { IUsersRepository };
