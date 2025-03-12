import { IsNotEmpty, IsString, IsEmail, IsOptional } from "class-validator";

export class UpdateUserDto{

    @IsOptional()
    @IsString()
    name?:           string;

    @IsOptional()
    @IsString()
    f_surname?:      string;

    @IsOptional()
    @IsString()
    m_surname?:      string;

    @IsOptional()
    @IsString()
    image?:          string;
    
    @IsOptional()
    @IsEmail()
    email?:          string;

    @IsOptional()
    @IsString()
    type_user?:       string;

    @IsOptional()
    @IsString()
    userKey?:    string;

    @IsOptional()
    @IsString()
    password?:       string;

    @IsOptional()
    @IsString()
    department:       string;

    @IsOptional()
    @IsString()
    position:       string;

    @IsOptional()
    @IsString()
    status?:       string;


}
