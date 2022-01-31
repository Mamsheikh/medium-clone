import { extendType, nonNull, stringArg } from 'nexus';
import { getSession } from 'next-auth/react';

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
        const req = ctx.req;
        const session = await getSession({ req });
        // console.log('email: ', session.user.email);
        const user = await ctx.prisma.user.findUnique({
          where: { email: session.user.email },
        });
        // console.log(user);
        if (args.title.length < 10) {
          throw new Error('Title must have atleast 10 characters.');
        } else if (args.title.length > 50) {
          throw new Error('Title must not be more than 50 characters.');
        }
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

export const createCommentMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createComment', {
      type: 'Comment',
      args: {
        postId: nonNull(stringArg()),
        userId: nonNull(stringArg()),
        content: nonNull(stringArg()),
      },
      async resolve(parent, args, ctx) {
        const req = ctx.req;
        const session = await getSession({ req });
        const user = await ctx.prisma.user.findUnique({
          where: { email: session.user.email },
        });
        console.log({ user });
        if (!user) {
          throw new Error('not authenticated');
        }
        const comment = ctx.prisma.comment.create({
          data: {
            userId: user.id,
            postId: args.postId,
            content: args.content,
            // user: { connect: { email: user.email } },
          },
        });
        return comment;
      },
    });
  },
});
