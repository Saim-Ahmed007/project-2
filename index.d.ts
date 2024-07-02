import { TJwtPayload } from './src/modules/Auth/auth.interface';
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: TJwtPayload;
    }
  }
}
