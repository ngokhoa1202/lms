import { UserRepository } from '@src/repository/framework/user/user.repository';
import { UniversityRepository } from '@src/repository/category/organization/university.repository';
import { InstructorRepository } from '@src/repository/framework/user/instructor.repository';
import { FacultyRepository } from '@src/repository/category/faculty/faculty.repository';

const UserRepo = new UserRepository();
const UniversityRepo = new UniversityRepository();
const InstructorRepo = new InstructorRepository();
const FacultyRepo = new FacultyRepository();

export { UserRepo, UniversityRepo, InstructorRepo, FacultyRepo };
