/*
  Warnings:

  - The `questionType` column on the `Question` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."QuestionType" AS ENUM ('MULTIPLE_CHOICE', 'TRUE_FALSE', 'MATCH_COLUMN', 'FILL_IN_BLANKS');

-- DropIndex
DROP INDEX "public"."QuizSubmission_quizId_studentId_key";

-- AlterTable
ALTER TABLE "public"."Answer" ADD COLUMN     "blankPosition" INTEGER,
ADD COLUMN     "matchPair" TEXT;

-- AlterTable
ALTER TABLE "public"."Question" ADD COLUMN     "explanation" TEXT,
ADD COLUMN     "questionData" JSONB,
DROP COLUMN "questionType",
ADD COLUMN     "questionType" "public"."QuestionType" NOT NULL DEFAULT 'MULTIPLE_CHOICE';

-- AlterTable
ALTER TABLE "public"."Quiz" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "maxAttempts" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "passingScore" DOUBLE PRECISION NOT NULL DEFAULT 60.0,
ADD COLUMN     "timeLimit" INTEGER;

-- AlterTable
ALTER TABLE "public"."QuizSubmission" ADD COLUMN     "attemptNumber" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "isPassed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "percentage" DOUBLE PRECISION,
ADD COLUMN     "timeSpent" INTEGER;
