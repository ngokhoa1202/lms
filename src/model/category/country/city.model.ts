import { ICountry } from '@src/model/category/country/country.model';
import mongoose from 'mongoose';

export interface ICity {
  _id: number;
  name: string;
  country: ICountry;
}

const citySchema = new mongoose.Schema<ICity>({
  _id: { type: Number, required: true },
  name: { type: String, required: true },
  country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true }
}, { _id: false, collection: 'cities', versionKey: true });

const City = mongoose.model<ICity>('City', citySchema, 'citites');
export default City;

