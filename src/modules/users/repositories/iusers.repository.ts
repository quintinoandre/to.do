import {
	CreateUserDTO,
	DeleteUserDTO,
	UpdateUserDTO,
	UpdateUserRolesDTO,
} from '../dtos';
import { UserEntity } from '../entities';

interface IUsersRepository {
	create(data: CreateUserDTO): Promise<UserEntity>;
	delete(data: DeleteUserDTO): Promise<void>;
	findByEmail(email: string): Promise<UserEntity>;
	findById(id: string): Promise<UserEntity>;
	findAll(): Promise<UserEntity[]>;
	updateUser(id: string, data: UpdateUserDTO): Promise<UserEntity>;
	updateUserRoles(id: string, roles: UpdateUserRolesDTO): Promise<UserEntity>;
}

export { IUsersRepository };
