import { prisma } from '@/lib/prisma';
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

export async function createAccount(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users/',
    {
      schema: {
        body: z.object({
          name: z.string(),
          email: z.email(),
          password: z.string().min(6),
        }),
      },
    },
    async (request, reply) => {
      const { name, email, password } = request.body;

      const userWithEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      
      if (userWithEmail) {
        return reply.status(400).send({
          message: 'User with this email already exists',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 6);

      await prisma.user.create({
        data: {
          name,
          email,
          passwordHash: hashedPassword,
        },
      });

      return reply.status(201).send({
        message: 'Account created successfully',
      });
    }
  );
}
