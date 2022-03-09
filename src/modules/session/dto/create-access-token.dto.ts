import { LeanDocument, FlattenMaps } from 'mongoose';

import { UserDocument } from '../../user/user.model';
import { SessionDocument } from '../session.model';

export interface CreateAccessTokenDto {
  user:
    | Omit<UserDocument, 'password'>
    | LeanDocument<Omit<UserDocument, 'password'>>
    | Pick<FlattenMaps<LeanDocument<UserDocument & { _id: any }>>, "_id" | "__v" | "id" | "email" | "name" | "createdAt" | "updatedAt" | "comparePassword">;
  session:
    | Omit<SessionDocument, 'password'>
    | LeanDocument<Omit<SessionDocument, 'password'>>;
}
