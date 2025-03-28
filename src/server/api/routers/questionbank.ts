import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const questionBankRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      title: z.string().min(1),
      description: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.questionBank.create({
        data: {
          name: input.title,
          description: input.description,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getAll: protectedProcedure
    .query(async ({ ctx }) => {
      return ctx.db.questionBank.findMany({
        where: {
          createdById: ctx.session.user.id,
        },
        include: {
          questions: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }),
});