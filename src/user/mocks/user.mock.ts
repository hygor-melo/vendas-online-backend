import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enum/user-type.enum";

export const userEntityMock: UserEntity = {
  id: 52345,
  cpf: '12345678',
  createdAt: new Date(),
  email: 'email@email.com',
  name: 'nameMock',
  password: 'passwordbemgrande',
  phone: '341241241241',
  typeUser: UserType.User,
  updatedAt: new Date(),
}