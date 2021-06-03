import { Router } from 'express';
import {
  postComment
} from '../controllers/comments.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/comments', authMiddleware, postComment);

export default router;
