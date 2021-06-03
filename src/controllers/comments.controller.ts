import { Request, Response } from 'express';
import { createComment } from '../services/blog.service';

export async function postComment(req: Request, res: Response) {
  const comment = await createComment(req.body.comment);
  res.status(201).json(comment);
}
