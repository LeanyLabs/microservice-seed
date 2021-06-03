import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../infra/logger';
import { JWT_SIGNING_SECRET } from '../config';

interface SessionDetails {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      session: SessionDetails;
    }
  }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization = req.headers.authorization ?? req.query?.token;

    if (typeof authorization !== 'string') {
      res.status(401).json({ error: 'Not authenticated, missing credentials.' });
      return;
    }

    const { userId } = jwt.verify(authorization, JWT_SIGNING_SECRET) as SessionDetails;

    req.session = { userId };

    next();
  } catch (err) {
    logger.error('Auth middleware error', { err });
    res.status(401).json({ error: 'Authentication error, could not verify credentials.' });
  }
}
