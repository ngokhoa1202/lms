import { Document, Model } from 'mongoose';

export interface IBaseRepository<AppModel> {
  create(model: AppModel): Promise<AppModel>;

  update(model: AppModel): Promise<AppModel | null>;

  deleteById(id: string | number): Promise<void>;

  findById(id: string | number): Promise<AppModel | null>;

  findAll(): Promise<AppModel[]>;
}

export abstract class BaseRepository<
  Doc extends Document<string | number> & { _id: string | number },
  AppModel extends { _id: string | number }
> implements IBaseRepository<AppModel> {

  protected abstract readonly model: Model<Doc>;


  public async create(model: AppModel): Promise<AppModel> {
    const modelCreated = await this.model.create(model);
    return modelCreated as AppModel;
  }

  public async update(model: Partial<AppModel> & { _id: string | number }): Promise<AppModel | null> {
    const { _id, ...updatedData } = model;
    /* TODO */
    const modelUpdated = await this.model.findByIdAndUpdate(_id, {}, { new: true })
      .lean().exec();
    return modelUpdated as AppModel | null;
  }

  public async findById(id: string | number): Promise<AppModel | null> {
    const model = await this.model.findById(id).lean().exec();
    return model as AppModel;
  }

  public async findAll(): Promise<AppModel[]> {
    const models = await this.model.find().lean().exec();
    return models as AppModel[];
  }

  public async deleteById(id: string | number): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }
}
