import {
  IsDefined,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';
import { IsAlphaWithSpaces } from '../common/dto/validator/is.alpha.with.spaces.validator';

export class CreateUserDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsAlphaWithSpaces()
  name: string;

  @IsDefined()
  @IsInt()
  @Min(1)
  age: number;
}

export class UserParamByIdDTO {
  @IsMongoId()
  user_id: string;
}

export class UpdateUserDTO {
  @ValidateIf((dto) => dto.name != undefined)
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsAlphaWithSpaces()
  name: string;

  @ValidateIf((dto) => dto.age != undefined)
  @IsDefined()
  @IsInt()
  @Min(1)
  age: number;
}
