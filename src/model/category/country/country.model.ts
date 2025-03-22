import mongoose from 'mongoose';

export interface ICountry {
  _id: number;
  countryCode: string;
  isoCodes: string[];
}

const countrySchema = new mongoose.Schema<ICountry>({
  _id: { type: Number, required: true },
  countryCode: { type: String, required: true },
  isoCodes: { type: [String], required: true }
}, { _id: false, collection: 'countries' });

const Country = mongoose.model<ICountry>('Country', countrySchema, 'countries');
export default Country;
