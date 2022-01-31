import { objectType } from 'nexus';
import { User } from '..';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.string('id'),
      t.string('title'),
      t.string('content'),
      t.string('thumbnail'),
      t.field('user', {
        type: User,
        resolve(parent, _args, ctx) {
          return ctx.prisma.post
            .findUnique({
              where: { id: parent.id },
            })
            .user();
        },
      }),
      t.list.field('comments', {
        type: 'Comment',
        resolve(parent, __, ctx) {
          return ctx.prisma.post
            .findUnique({
              where: { id: parent.id },
            })
            .comments();
        },
      });
  },
});
