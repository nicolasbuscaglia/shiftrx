import { Request } from 'express';
import { RequestUser } from '../interfaces/auth.interface';

export interface RequestWithUser extends Request {
  user: RequestUser;
}

export interface AccessToken {
  access_token: string;
}
