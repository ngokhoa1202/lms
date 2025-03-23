import { AcademicGrade } from '@src/constants/enum/degree/academicGrade.enum';
import { AcademicRank } from '@src/constants/enum/degree/academicRank.enum';
import { StudyFormat } from '@src/constants/enum/degree/studyFormat.enum';
import { IUserCreationDto } from '@src/controller/framework/user/dto/user.dto';

interface IDegreeDto {
  rank: AcademicRank;
  major: string;
  issueDate: Date;
  universityId: number;
  studyFormat: StudyFormat;
  grade: AcademicGrade;
}

interface ICertificateDto {
  issueDate: Date;
  score: number;
  id: number;
}

export interface IInstructorCreationDto extends IUserCreationDto {
  degrees: IDegreeDto[];
  majors: string[];
  certificates: ICertificateDto[];
  expertise: number;
  biography: string;
  dateOfBirth: Date;
  nationalityId: number;
}
