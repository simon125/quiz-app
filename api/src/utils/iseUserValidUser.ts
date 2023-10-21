import { NextFunction, Request, Response } from "express";
import { prisma } from "../prismaClient";

export const isUserValidUser = async (
  req: Request<unknown, unknown, unknown>,
  response: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization;
    if (typeof authorization === "string") {
      const { name = "", password = "" } = JSON.parse(authorization) || {
        name: "",
        password: "",
      };
      const user = await prisma.user.findUnique({ where: { password, name } });
      if (!!user) {
        return next();
      }
    }

    throw new Error();
  } catch (error) {
    console.log(error);

    return response.status(400).json({ msg: "something went wrong" });
  }
};
