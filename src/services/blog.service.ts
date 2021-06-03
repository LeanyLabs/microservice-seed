import { Comment } from '../db';

export async function createComment(text: string) {
  const comment = await Comment.create({ text });
  return comment;
}
