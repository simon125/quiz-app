import { FC } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { Navigate } from "react-router-dom";

export const UnauthorizedRedirect: FC = () => {
  const { userState } = useUserContext();

  if (!userState?.isLoggedIn) {
    return <Navigate to="/" />;
  }

  return null;
};
