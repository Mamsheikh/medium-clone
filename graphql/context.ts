import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from 'next-auth';
import { getSession } from 'next-auth/react';
import prisma from '../lib/prisma';

export type Context = {
  prisma: PrismaClient;
  req: NextApiRequest;
  res: NextApiResponse;
};
export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}): Promise<Context> {
  const session = await getSession({ req });
  // console.log({ session });
  /* ... */
  // const user = session.user;
  // if (!user) {
  //   throw new Error('unauthenticated');
  // }
  // const user = await prisma.user.findUnique({
  //   where: { email: session.user.email },
  // });
  // console.log(user);
  return {
    prisma,
    req,
    res,
  };
}
