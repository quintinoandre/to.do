import { ICreateUserDTO } from '../dtos';
import { IUserEntity } from '../entities';

interface IUsersRepository {
	create(data: ICreateUserDTO): Promise<IUserEntity>;
	findByEmail(email: string): Promise<IUserEntity>;
}

export { IUsersRepository };
