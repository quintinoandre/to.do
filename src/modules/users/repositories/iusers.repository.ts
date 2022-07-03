import { CreateUserDTO, FindUserDTO } from '../dtos';
import { IUserEntity } from '../entities';

interface IUsersRepository {
	create(data: CreateUserDTO): Promise<IUserEntity>;
	findByEmail(email: string): Promise<IUserEntity>;
	findById(data: FindUserDTO): Promise<IUserEntity>;
	findAll(): Promise<IUserEntity[]>;
}

export { IUsersRepository };
