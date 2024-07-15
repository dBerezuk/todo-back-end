import mongoose from 'mongoose';
import { IBase } from './base.types';

export interface ITaskRequest {
  text: string;
  isCompleted: boolean;
}

export interface ITaskParams {
  _id?: string;
}

export type TTaskResponse = {
  user: mongoose.Types.ObjectId;
} & ITaskRequest &
  IBase;

export type TTaskSchema = {
  user: mongoose.Types.ObjectId;
} & ITaskRequest &
  mongoose.Document;
