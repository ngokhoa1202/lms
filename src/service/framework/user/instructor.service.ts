import { UserRole } from '@src/constants/enum/user/userRole.enum';
import { IInstructorCreationDto } from '@src/controller/framework/user/dto/instructor.dto';
import { EntityNotFoundError, UnauthorizedError } from '@src/error/errors';
import { UserRepo, UniversityRepo } from '@src/repository/index.repository';


const createInstructor = async (id: string, dto: IInstructorCreationDto) => {
  const user = await UserRepo.findById(id);
  if (!user) {
    throw EntityNotFoundError.of('User', 'id');
  }

  const degrees = await Promise.any(dto.degrees.map(async (degree) => {
    const university = await UniversityRepo.findById(degree.universityId);
    if (!university) {
      throw EntityNotFoundError.of('University', 'degree.universityId');
    }
    return university;
  }));

};

const InstructorService = { createInstructor };
export default InstructorService;
