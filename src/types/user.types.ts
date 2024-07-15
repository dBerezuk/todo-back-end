import mongoose from 'mongoose';
import { IBase } from './base.types';

export interface IUserRequest {
  email: string;
  password: string;
}

export interface IUserRequestRegister extends IUserRequest {
  password_repeat: string;
}

export type TUserResultData = IUserRequest & IBase;

export type TUserSchema = IUserRequest & mongoose.Document;
