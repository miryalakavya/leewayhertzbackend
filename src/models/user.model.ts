import { Document, Schema, Model, model,Types } from 'mongoose';

export interface IUser {
    _id?: Types.ObjectId | string,
    name: string,
    password: string,
    phoneNumber?: number;
    email?: string;
};

const userSchema: Schema = new Schema({
    name: { type: String, trim: true, unique: true },
    password: { type: String, trim: true },
    phoneNumber: { type: Number,  trim: true },
    email: { type: String, require: 'Email Id is required', trim: true, required: true, unique: true },  
});

export const User: Model<IUser & Document> = model<IUser & Document>('User', userSchema);