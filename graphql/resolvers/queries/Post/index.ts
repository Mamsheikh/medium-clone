import { extendType } from 'nexus';

export const GetAllPosts = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('posts', {
      type: 'Post',
      resolve(_, __, ctx) {
        return ctx.prisma.post.findMany();
      },
    });
  },
});
