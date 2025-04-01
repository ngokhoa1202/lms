import { ICountryDocument } from '@src/model/category/country/country.model';
import mongoose, {Document} from 'mongoose';

export interface ICityDocument extends Document {
  _id: number;
  name: string;
  country: ICountryDocument;
}

const citySchema = new mongoose.Schema<ICityDocument>({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true }
}, { _id: false, collection: 'cities', versionKey: true });

const City = mongoose.model<ICityDocument>('City', citySchema, 'cities');
export default City;

