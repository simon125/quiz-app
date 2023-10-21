import { FC, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

interface AppShellProps {
  children: ReactNode;
}

export const AppShell: FC<AppShellProps> = ({ children }) => {
  const { userState, setUserState } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const userId = userState?.user.id;

  return (
    <>
      <header className="w-full bg-blue-500 shadow-2xl">
        <div className="container mx-auto py-5 px-4 sm:px-0 flex items-center justify-between">
          <h1 className="text-white text-2xl relative z-10">Quiz App</h1>
          {userState?.isLoggedIn && (
            <>
              <button
                className="md:sr-only relative z-10"
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg fill="white" viewBox="0 0 100 80" width="40" height="40">
                  <rect y="10" width="70" height="5"></rect>
                  <rect y="30" width="70" height="5"></rect>
                  <rect y="50" width="70" height="5"></rect>
                </svg>
              </button>
              <nav
                className={`bg-blue-500 fixed left-0 right-0 md:static p-10 md:p-0 ${
                  isOpen ? "top-[80px]" : "top-[-480px]"
                }`}
              >
                <ul className="flex gap-6 flex-col items-center md:flex-row ">
                  <li>
                    <Link
                      className="text-slate-100 hover:text-slate-50 hover:underline underline-offset-4"
                      to={`/user/${userId}`}
                    >
                      My Details
                    </Link>
                  </li>
                  {userState?.user?.role === "admin" && [
                    <li key="users">
                      <Link
                        className="text-slate-100 hover:text-slate-50 hover:underline underline-offset-4"
                        to={`/users`}
                      >
                        Users
                      </Link>
                    </li>,
                    <li key="quiz-creator">
                      <Link
                        className="text-slate-100 hover:text-slate-50 hover:underline underline-offset-4"
                        to={`/quiz-creator`}
                      >
                        Quiz Creator
                      </Link>
                    </li>,
                    <li key="dashboard">
                      <Link
                        className="text-slate-100 hover:text-slate-50 hover:underline underline-offset-4"
                        to={`/dashboard`}
                      >
                        Dashboard
                      </Link>
                    </li>,
                  ]}
                  <li>
                    <Link
                      className="text-slate-100 hover:text-slate-50 hover:underline underline-offset-4"
                      to={`/quiz`}
                    >
                      Quiz
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-slate-100 hover:text-slate-50 hover:underline underline-offset-4"
                      onClick={() => setUserState(null)}
                      to={`/`}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </nav>
            </>
          )}
        </div>
      </header>
      <main className="container mx-auto pb-5 pt-10 px-4 sm:px-0">
        {children}
      </main>
    </>
  );
};
