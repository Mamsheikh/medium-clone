import { PrismaClient } from '@prisma/client';
import { User } from 'next-auth';
import { getSession } from 'next-auth/react';
import prisma from '../lib/prisma';

export type Context = {
  prisma: PrismaClient;
  user: User;
};
export async function createContext({ req, res }): Promise<Context> {
  const session = await getSession({ req });
  console.log({ session });
  /* ... */
  // const user = session.user;
  // if (!user) {
  //   throw new Error('unauthenticated');
  // }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  console.log(user);
  return {
    prisma,
    user,
  };
}
