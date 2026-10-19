import { CreateUserDto } from '../../application/dto/create-user.dto';
import { IsEmail, Length } from 'class-validator';
import {
  emailConstraints,
  loginConstraints,
  passwordConstraints,
} from '../../domain/user.entity';
import { IsStringWithTrim } from '../../../../../core/decorators/validation/is-string-with-trim';

export class CreateUserInputDto implements CreateUserDto {
  @IsStringWithTrim(loginConstraints.minLength, loginConstraints.maxLength)
  login: string;

  @IsEmail()
  @IsStringWithTrim(emailConstraints.minLength, emailConstraints.maxLength)
  email: string;

  @Length(passwordConstraints.minLength, passwordConstraints.maxLength)
  password: string;
}
