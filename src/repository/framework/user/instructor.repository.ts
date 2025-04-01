import { BaseRepository, IBaseRepository } from '@src/repository/base/base.repository';
import Instructor, { IInstructorDocument, IInstructorModel } from '@src/model/framework/user/instructor.model';

export class InstructorRepository extends BaseRepository<IInstructorDocument, IInstructorModel>
  implements IBaseRepository<IInstructorModel> {

  protected readonly model = Instructor;

}
