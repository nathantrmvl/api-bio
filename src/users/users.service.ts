import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async login(user: UpdateUserDto) {
    try {
      const register: User = await this.userModel.findOne({ userKey: user.userKey });
      if (!register) return false;
      return (await bcrypt.compare(user.password, register.password)) ? register : false;
    } catch (error) {
      return false;
    }
  }

  async create(user: CreateUserDto) {
    try {
      console.log("Datos recibidos para creación:", user);
      // Verificar si el usuario ya existe por userKey o email
      const existingUser = await this.userModel.findOne({ userKey: user.userKey });
      if (existingUser) {
        console.log("El usuario ya existe:", existingUser);
        throw new Error('El usuario ya existe con esta userKey.');
      }

      const existingEmail = await this.userModel.findOne({ email: user.email });
      if (existingEmail) {
        throw new Error('El email ya está registrado.');
      }

      const saltOrRounds = 10;
      const hash = await bcrypt.hash(user.password, saltOrRounds);
      const newUser = { ...user, password: hash };
      const userCreated = new this.userModel(newUser);
      return await userCreated.save();
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Error al crear el usuario');
    }
  }

  async update(userKey: string, user: UpdateUserDto) {
    try {
      // Filtrar propiedades undefined antes de enviar la actualización
      const updateData = Object.fromEntries(
        Object.entries(user).filter(([key, value]) => value !== undefined)
      );

      if (updateData.password) {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(updateData.password, saltOrRounds);
        updateData.password = hash;
      }

      return this.userModel.findOneAndUpdate({ userKey }, updateData, { new: true }).exec();
    } catch (error) {
      throw new Error(`Error al actualizar el usuario: ${error.message}`);
    }
  }

  async findOne(userKey: string) {
    return this.userModel.findOne({ userKey }).exec();
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async deleteByUserKey(userKey: string) {
    return this.userModel.deleteOne({ userKey });
  }
}