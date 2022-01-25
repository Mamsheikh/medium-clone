import { ChangeEvent } from 'react';
import { User } from '../graphql/resolvers/models/User';
export interface IBlog {
  id?: string;
  user: string | typeof User;
  title: string;
  content: string;
  description: string;
  thumbnail: string | File;
  category: string;
  createdAt: string;
}
export type InputChange = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

//   export interface IUser {
//     avatar: string
//     createdAt: string
//     name: string
//     role: string
//     type: string
//     updatedAt: string
//     _id: string
//   }
