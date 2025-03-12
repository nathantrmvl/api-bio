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

  // 📌 Login con userKey (manteniendo userKey como "nombre de usuario")
  async login(user: UpdateUserDto) {
    try {
      const register: User = await this.userModel.findOne({ userKey: user.userKey }).exec();
      if (!register) return false;
      return (await bcrypt.compare(user.password, register.password)) ? register : false;
    } catch (error) {
      return false;
    }
  }

  // 📌 Crear un usuario validando userKey y email
  async create(user: CreateUserDto) {
    try {
      console.log("Datos recibidos para creación:", user);

      // Verificar si el usuario ya existe por userKey o email
      const existingUser = await this.userModel.findOne({ userKey: user.userKey }).exec();
      if (existingUser) {
        console.log("El usuario ya existe:", existingUser);
        throw new Error('El usuario ya existe con esta userKey.');
      }

      const existingEmail = await this.userModel.findOne({ email: user.email }).exec();
      if (existingEmail) {
        throw new Error('El email ya está registrado.');
      }

      const saltOrRounds = 10;
      const hash = await bcrypt.hash(user.password, saltOrRounds);
      const newUser = new this.userModel({ ...user, password: hash });

      return await newUser.save();
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Error al crear el usuario');
    }
  }

  // 📌 Actualizar usuario usando `_id` en lugar de `userKey`
  async update(id: string, user: UpdateUserDto) {
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

      return this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    } catch (error) {
      throw new Error(`Error al actualizar el usuario: ${error.message}`);
    }
  }

  // 📌 Buscar usuario por `_id`
  async findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  // 📌 Obtener todos los usuarios
  async findAll() {
    return this.userModel.find().exec();
  }

  // 📌 Eliminar usuario por `_id`
  async deleteById(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
