import University, { IUniversityDocument, IUniversityModel } from '@src/model/category/organization/university.model';
import { BaseRepository, IBaseRepository } from '@src/repository/base/base.repository';

export class UniversityRepository extends BaseRepository<IUniversityDocument, IUniversityModel>
  implements IBaseRepository<IUniversityModel> {

  protected readonly model = University;


}
