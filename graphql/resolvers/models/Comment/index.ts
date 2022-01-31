import { getSession } from 'next-auth/react';
import { objectType } from 'nexus';

export const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.string('id'),
      t.string('content'),
      t.string('postId'),
      t.string('userId'),
      t.list.field('user', {
        type: 'User',
        resolve(parent, __, ctx) {
          return ctx.prisma.user.findUnique({
            where: { id: parent.userId },
          });
        },
      });
  },
});
