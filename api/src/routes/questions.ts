import { Router } from "express";
import {
  addQuestion,
  deleteQuestion,
  getQuestions,
} from "../controllers/questions";
import { isUserValidAdmin } from "../utils/isUserValidAdmin";
import { isUserValidUser } from "../utils/iseUserValidUser";

const questionsRouter = Router({ mergeParams: true });

questionsRouter
  .route("/")
  .post(isUserValidAdmin, addQuestion)
  .get(isUserValidUser, getQuestions);

questionsRouter.route("/:id").delete(isUserValidAdmin, deleteQuestion);

export { questionsRouter };
