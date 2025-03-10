import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Post("login")
  async login(@Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.login(updateUserDto);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':userKey')
  update(@Param('userKey') userKey: string, @Body() updateUserDto: UpdateUserDto) {
    if (!updateUserDto) {
      throw new Error('Datos de usuario no proporcionados.');
    }
    return this.usersService.update(userKey, updateUserDto);
  }

  @Delete(':userKey')
  delete(@Param('userKey') userKey: string) {
    return this.usersService.deleteByUserKey(userKey);
  }
}
