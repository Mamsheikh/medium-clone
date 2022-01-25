import { extendType, nonNull, stringArg } from 'nexus';

export const createPostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createPost', {
      type: 'Post',
      args: {
        title: nonNull(stringArg()),
        thumbnail: nonNull(stringArg()),
        content: nonNull(stringArg()),
        category: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        const user = await ctx.prisma.user.findUnique({
          where: { email: ctx.user.email },
        });
        console.log({ user });
        if (!user) {
          throw new Error(`You do not have permission to perform action`);
        }

        return await ctx.prisma.post.create({
          data: {
            title: args.title,
            thumbnail: args.thumbnail,
            content: args.content,
            category: args.category,
            user: { connect: { email: user.email } },
          },
        });
      },
    });
  },
});
