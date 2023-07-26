import { ReturnAddressDTO } from "src/address/dtos/returnAddress.dto";
import { UserEntity } from "../entities/user.entity";

export class ReturnUserDTO {
  constructor(userEntity: UserEntity){
    this.id = userEntity.id,
    this.name = userEntity.name,
    this.email = userEntity.email,
    this.phone = userEntity.phone,    
    this.cpf = userEntity.cpf,
    this.createdAt = userEntity.createdAt
    this.addresses = userEntity.addresses 
      ? userEntity.addresses.map((address) => new ReturnAddressDTO(address)) 
      : undefined
  }

  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  createdAt: Date;
  addresses?: ReturnAddressDTO[]
}