import { NextApiResponse, NextApiRequest } from 'next';
// /graphql/context.ts
import { PrismaClient } from '@prisma/client';
import prisma from '../lib/prisma';

export type Context = {
  prisma: PrismaClient;
};
export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}): Promise<Context> {
  return {
    prisma,
  };
}