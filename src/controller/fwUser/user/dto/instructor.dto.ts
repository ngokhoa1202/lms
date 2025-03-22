import { IUserCreationDto } from '@src/controller/fwUser/user/dto/user.dto';


export interface IInstructorCreationDto extends IUserCreationDto {
  degrees: string[];
  majors: string[];
  certificates: string[];
  expertise: number;
  biography: string;
  age: number;
}
