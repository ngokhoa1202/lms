import { IInstructorCreationDto } from '@src/controller/framework/user/dto/instructor.dto';
import { EntityNotFoundError } from '@src/error/errors';
import University from '@src/model/category/organization/university.model';


const createInstructor = async (dto: IInstructorCreationDto) => {
  dto.degrees.forEach(async (degree) => {
    const university = await University.findById(degree.universityId).exec();
    if (!university) {
      throw EntityNotFoundError.of('University', 'University Id');
    }
  });
};

const InstructorService = { createInstructor };
export default InstructorService;
