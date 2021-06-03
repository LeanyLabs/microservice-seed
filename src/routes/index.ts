import express, { Request, Response } from 'express';
import comments from './comments';
import { SERVICE_NAME } from '../config';

const router = express.Router();

router.use(comments);

router.get('/', getHealth);
router.get('/health', getHealth);

function getHealth(req: Request, res: Response) {
  res.status(200).json({
    ok: true,
    serviceName: SERVICE_NAME,
    message: 'Healthy',
  });
}

export default router;
