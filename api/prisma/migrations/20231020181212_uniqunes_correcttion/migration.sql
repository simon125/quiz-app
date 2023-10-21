/*
  Warnings:

  - Added the required column `id` to the `UserAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Answer_questionId_key";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserAnswer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "attemptCount" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    CONSTRAINT "UserAnswer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserAnswer" ("answer", "attemptCount", "isCorrect", "question", "userId") SELECT "answer", "attemptCount", "isCorrect", "question", "userId" FROM "UserAnswer";
DROP TABLE "UserAnswer";
ALTER TABLE "new_UserAnswer" RENAME TO "UserAnswer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
