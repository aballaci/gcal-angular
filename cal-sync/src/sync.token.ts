import { Document, Schema, Model, model} from 'mongoose';
// import { ISynctoken } from './interfaces/synctoken';

export interface ISynctokenModel extends Document {
  cal_id: String;
  sync_token: String;
}


export let SynctokenSchema: Schema = new Schema({
  cal_id: String,
  sync_token: String
});


export const Synctoken: Model<ISynctokenModel> = model<ISynctokenModel>('sync-tokens', SynctokenSchema);

