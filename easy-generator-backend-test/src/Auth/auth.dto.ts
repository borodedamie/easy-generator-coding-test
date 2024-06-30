import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class SignInDto {
    @IsNotEmpty()
    @IsEmail()   
    @Transform(({ value }) => value.trim())
    email: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message: 'invalid password',
    })
    password: string;
}