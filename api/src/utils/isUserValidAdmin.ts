import { NextFunction, Request, Response } from "express";
import { prisma } from "../prismaClient";

export const isUserValidAdmin = async (
  req: Request<unknown, unknown, unknown>,
  response: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization;
    if (typeof authorization === "string") {
      const {
        name = "",
        password = "",
        role = "",
      } = JSON.parse(authorization) || {
        name: "",
        password: "",
        role: "",
      };
      const user = await prisma.user.findUnique({
        where: { password, name, role },
      });
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
