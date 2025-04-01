import { AcademicGrade } from '@src/constants/enum/degree/academicGrade.enum';
import { AcademicRank } from '@src/constants/enum/degree/academicRank.enum';
import { StudyFormat } from '@src/constants/enum/degree/studyFormat.enum';
import { IUserDto } from '@src/controller/framework/user/dto/user.dto';
import { ICorporation } from '@src/model/category/organization/corporation.model';

interface IDegreeDto {
  rank: AcademicRank;
  major: string;
  issueDate: Date;
  universityId: string;
  studyFormat: StudyFormat;
  grade: AcademicGrade;
}

interface ICertificateDto {
  issueDate: Date;
  score: number;
  typeId: number;
}

interface IInstructorCertificateDto {
  id: number;
  name: string;
  organization: ICorporation;
  totalScore: number;
  issueDate: Date;
  score: number;

}

export interface IInstructorCreationDto {
  degrees: IDegreeDto[];
  majors: string[];
  certificates: ICertificateDto[];
  expertise: number;
  biography: string;
  dateOfBirth: Date;
  nationalityId: number;
}

export interface IInstructorDto extends IUserDto {
  majors: string[];
  certificates;
}
