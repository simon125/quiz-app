import { Request, Response } from "express";

import { prisma } from "../prismaClient";

export const signIn = async (
  req: Request<void, void, { name?: string; password?: string }>,
  resp: Response
) => {
  const { name, password } = req.body;

  console.log({ name, password });
  if (!name?.trim() || !password?.trim()) {
    return resp.status(400).json({ msg: "You did not provide credentials" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { name, password } });

    if (user) {
      return resp.status(200).json({ user, isLoggedIn: true });
    }

    return resp
      .status(400)
      .json({ msg: "Something went wrong please try again!" });
  } catch (error) {
    return resp.status(500).json({ msg: "Something went really wrong!" });
  }
};

export const signUp = async (
  req: Request<void, void, { name?: string; password?: string }>,
  resp: Response
) => {
  const { name, password } = req.body;

  console.log(req.body);
  if (!name?.trim() || !password?.trim()) {
    return resp.status(400).json({ msg: "You did not provide credentials" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { name, password } });

    if (user) {
      return resp.status(200).json({ msg: "User already exists" });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        password,
        role: "user",
      },
    });

    return resp.status(200).json({ user: newUser, isLoggedIn: true });
  } catch (error) {
    return resp.status(500).json({ msg: "Something went really wrong!" });
  }
};

export const deleteUser = async (req: Request, resp: Response) => {
  const { id } = req.params;

  try {
    await prisma.quizAttempt.deleteMany({
      where: {
        userId: Number(id),
      },
    });

    const deletedUser = await prisma.user.delete({
      where: { id: Number(id) },
    });

    return resp.status(200).json(deletedUser);
  } catch (error) {
    return resp
      .status(500)
      .json({ msg: "Something went really wrong!", error });
  }
};

export const getUsers = async (req: Request, resp: Response) => {
  try {
    const users = await prisma.user.findMany({
      where: { role: "user" },
      include: {
        answers: true,
      },
    });

    return resp.status(200).json(users);
  } catch (error) {
    return resp.status(500).json({ msg: "Something went really wrong!" });
  }
};
