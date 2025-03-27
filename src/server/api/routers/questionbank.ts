import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const questionBankRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      title: z.string().min(1),
      description: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // TODO: Implement question bank creation in database
      return {
        success: true,
        message: "Question bank created successfully",
      };
    }),
});