import { IsNotEmpty, IsString, IsEmail, IsOptional } from "class-validator";

export class CreateUserDto{

    @IsNotEmpty()
    @IsString()
    name:           string;

    @IsNotEmpty()
    @IsString()
    f_surname:      string;

    @IsNotEmpty()
    @IsString()
    m_surname:      string;

    @IsOptional()
    @IsString()
    image?:          string;
    
    @IsNotEmpty()
    @IsEmail()
    email:          string;

    @IsNotEmpty()
    @IsString()
    type_user:       string;

    @IsNotEmpty()
    @IsString()
    program:        string;

    @IsNotEmpty()
    @IsString()
    userKey:    string;

    @IsNotEmpty()
    @IsString()
    password:       string;

    @IsNotEmpty()
    @IsString()
    department:       string;

    @IsNotEmpty()
    @IsString()
    position:       string;

    @IsNotEmpty()
    @IsString()
    status:       string;


}
