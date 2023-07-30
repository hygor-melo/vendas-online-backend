import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAddressDTO } from './dtos/createAddress.dto';
import { AddressService } from './address.service';
import { AddressEntity } from './entities/addres.entity';
import { Roles } from 'src/decorators/role.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('address')
export class AddressController {

  constructor(
    private readonly addressService: AddressService
  ){};

  @Post()
  @Roles(UserType.User)
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() createAddressDto: CreateAddressDTO, 
    @UserId() userId: number
  ): Promise<AddressEntity>{
    return this.addressService.createAddress(createAddressDto, userId);
  }
}