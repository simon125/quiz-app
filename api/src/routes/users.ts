import { Router } from "express";
import { deleteUser, signIn, signUp, getUsers } from "../controllers/users";
import { isUserValidAdmin } from "../utils/isUserValidAdmin";

const usersRouter = Router({ mergeParams: true });

usersRouter.route("/sign-in").post(signIn);
usersRouter.route("/sign-up").post(signUp);

usersRouter.route("/").get(isUserValidAdmin, getUsers);

usersRouter.route("/:id").delete(isUserValidAdmin, deleteUser);

export { usersRouter };
