-- CreateEnum
CREATE TYPE "QuestionBankStatus" AS ENUM ('DRAFT', 'PENDING', 'PUBLISHED', 'DECLINED');

-- AlterTable
ALTER TABLE "QuestionBank" ADD COLUMN     "status" "QuestionBankStatus" NOT NULL DEFAULT 'DRAFT';

-- CreateIndex
CREATE INDEX "QuestionBank_status_idx" ON "QuestionBank"("status");
