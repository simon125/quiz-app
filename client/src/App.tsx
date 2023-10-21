import { Route, Routes } from "react-router-dom";
import { Users, Dashboard, Quiz, QuizCreator, SignInUp, User } from "./pages";
import { AppShell } from "./components";
import { useUserContext } from "./contexts/UserContext";
import { UnauthorizedRedirect } from "./components/UnauthorizedRedirect/UnauthorizedRedirect";

export const App = () => {
  const { userState } = useUserContext();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <AppShell>
              <SignInUp />
            </AppShell>
          }
        />
        <Route
          path="/quiz"
          element={
            <AppShell>
              <UnauthorizedRedirect />
              <Quiz />
            </AppShell>
          }
        />
        <Route
          path="/user/:id"
          element={
            <AppShell>
              <UnauthorizedRedirect />
              <User />
            </AppShell>
          }
        />
        {userState?.user?.role === "admin" && [
          <Route
            key="/dashboard"
            path="/dashboard"
            element={
              <AppShell>
                <UnauthorizedRedirect />
                <Dashboard />
              </AppShell>
            }
          />,
          <Route
            key="/quiz-creator"
            path="/quiz-creator"
            element={
              <AppShell>
                <UnauthorizedRedirect />
                <QuizCreator />
              </AppShell>
            }
          />,

          <Route
            key="/users"
            path="/users"
            element={
              <AppShell>
                <UnauthorizedRedirect />
                <Users />
              </AppShell>
            }
          />,
        ]}
      </Routes>
    </>
  );
};
