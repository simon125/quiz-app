import { Request, Response } from "express";
import { prisma } from "../prismaClient";

export const postAttempt = async (
  req: Request<void, void, { userId: string; score: number }>,
  resp: Response
) => {
  try {
    const { score, userId } = req.body;
    const numberScore = Number(score);
    const numberUserId = Number(userId);
    if (!isNaN(numberScore) || !isNaN(numberUserId)) {
      const attempt = await prisma.quizAttempt.create({
        data: {
          score: numberScore,
          userId: numberUserId,
        },
      });

      return resp.status(201).json(attempt);
    }
  } catch (error) {
    return resp.status(500).json({ msg: "Something went wrong" });
  }
};

export const getAttemptsDetails = async (req: Request, resp: Response) => {
  try {
    const user = JSON.parse(req?.headers?.authorization || "");

    const attempts = await prisma.quizAttempt.findMany({
      where: {
        userId: user?.id,
      },
    });

    return resp.status(200).json(attempts);
  } catch (error) {
    return resp.status(500).json({ msg: "Something went wrong" });
  }
};
