import { Router } from "express";
import { postAttempt, getAttemptsDetails } from "../controllers/usersAnswers";
import { isUserValidUser } from "../utils/iseUserValidUser";

const attemptsRouter = Router({ mergeParams: true });

attemptsRouter
  .route("/")
  .post(isUserValidUser, postAttempt)
  .get(isUserValidUser, getAttemptsDetails);

export { attemptsRouter };
