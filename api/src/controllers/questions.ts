import { Request, Response } from "express";
import { prisma } from "../prismaClient";

export const addQuestion = async (
  req: Request<
    void,
    void,
    { question: string; answers: Array<{ isCorrect: boolean; answer: string }> }
  >,
  resp: Response
) => {
  const { answers, question } = req.body;

  console.log(req.body);

  try {
    if (!question || question?.trim().length === 0 || answers.length < 2) {
      throw new Error();
    }
    const questionEntity = await prisma.question.create({
      data: {
        question,
        answers: {
          create: answers,
        },
      },
      include: {
        answers: true,
      },
    });

    return resp.status(201).json(questionEntity);
  } catch (error) {
    return resp.status(500).json({ msg: "Something went really bad!", error });
  }
};

export const getQuestions = async (req: Request, resp: Response) => {
  try {
    const questions = await prisma.question.findMany({
      include: { answers: true },
    });

    return resp.status(200).json(questions);
  } catch (error) {
    return resp.status(500).json({ msg: "Something went wrong!" });
  }
};

export const deleteQuestion = async (
  req: Request<{ id: string }>,
  resp: Response
) => {
  try {
    const { id } = req.params;
    const questionId = Number(id);
    console.log({ questionId });

    // return resp.status(200).json({ msg: "ok" });

    await prisma.answer.deleteMany({
      where: {
        questionId,
      },
    });

    await prisma.question.delete({
      where: {
        id: questionId,
      },
    });
    return resp.status(200).json({ msg: "ok" });
  } catch (error) {
    return resp.status(500).json({ msg: "Something went wrong" });
  }
};
