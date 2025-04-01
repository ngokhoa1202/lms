import mongoose, { Document } from 'mongoose';

export interface ICountryDocument extends Document {
  name: string;
  countryCode: string;
  isoCodes: string[];
}

const countrySchema = new mongoose.Schema<ICountryDocument>({
  countryCode: { type: String, required: true },
  isoCodes: { type: [String], required: true }
}, { _id: true, collection: 'countries' });

export interface ICountryModel {
  _id: string;
  name: string;
  countryCode: string;
  isoCodes: string[];
}

const Country = mongoose.model<ICountryDocument>('Country', countrySchema, 'countries');
export default Country;
