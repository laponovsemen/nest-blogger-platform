import {
  emailConstraints,
  passwordConstraints,
} from '../../../users/domain/user.entity';
import { IsStringWithTrim } from '../../../../../core/decorators/validation/is-string-with-trim';

export class LoginDto {
  @IsStringWithTrim(emailConstraints.minLength, emailConstraints.maxLength)
  loginOrEmail: string;
  @IsStringWithTrim(
    passwordConstraints.minLength,
    passwordConstraints.maxLength,
  )
  password: string;
}
