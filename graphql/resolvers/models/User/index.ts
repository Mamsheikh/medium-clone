import { objectType } from 'nexus';
import { Post } from '..';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id'),
      t.string('name'),
      t.string('image'),
      t.string('email'),
      t.boolean('isAdmin'),
      t.list.field('posts', {
        type: Post,
        resolve(parent, _args, ctx) {
          return ctx.prisma.user
            .findUnique({
              where: { id: parent.id },
            })
            .posts();
        },
      });
  },
});
