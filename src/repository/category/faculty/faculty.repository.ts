import { IBaseRepository } from '@src/repository/base/base.repository';
import Faculty, { IFacultyModel } from '@src/model/category/faculty/faculty.model';
import FacultyUniversity from "@src/model/category/faculty/facultyUniversity.model";

export class FacultyRepository implements IBaseRepository<IFacultyModel> {

  private readonly facultyModel = Faculty;
  private readonly facultyUniversityModel = FacultyUniversity;

  public async create(model: IFacultyModel): Promise<IFacultyModel> {
    const faculty = await this.facultyModel.create(model);
    return faculty as IFacultyModel;
  }

  public async deleteById(id: string | number): Promise<void> {
    await this.facultyModel.findByIdAndDelete(id);
  }

  public async findAll(): Promise<IFacultyModel[]> {
    const faculties = await this.facultyModel.find();
    return faculties as IFacultyModel[];
  }

  public async findById(id: string | number): Promise<IFacultyModel | null> {
    const faculty = await this.facultyModel.findById(id).exec();
    return faculty as IFacultyModel;
  }

  public async update(model: IFacultyModel): Promise<IFacultyModel | null> {
    const facultyUpdated = await this.facultyModel.findByIdAndUpdate(model._id, model, { new: true });
    return facultyUpdated as IFacultyModel;
  }

}
