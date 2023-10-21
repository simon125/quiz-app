import {
  createContext,
  useContext,
  useState,
  useEffect,
  FC,
  ReactNode,
} from "react";
import { UserRole } from "../types";
import { toast } from "react-toastify";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  saveUserInLocalStorage,
} from "../localStorage";
import { has } from "lodash";

const UserContext = createContext<UserContextType | null>(null);

interface User {
  id: number | string;
  name: string;
  password: string;
  role: UserRole;
}

interface UserState {
  isLoggedIn: boolean;
  user: User;
}

const isUser = (maybeUser: unknown): maybeUser is UserState => {
  return (
    !!maybeUser &&
    has(maybeUser, "user.name") &&
    has(maybeUser, "user.password") &&
    has(maybeUser, "isLoggedIn")
  );
};

const initiState = () => {
  try {
    const state = getUserFromLocalStorage();
    if (!state) return null;
    const newUser = JSON.parse(state);
    if (isUser(newUser)) {
      return newUser;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

const useUser = () => {
  const [userState, setUserState] = useState<UserState | null>(initiState);

  useEffect(() => {
    const localStoragePayload = getUserFromLocalStorage();
    if (localStoragePayload) {
      try {
        const parsedValue = JSON.parse(localStoragePayload);
        if (isUser(parsedValue)) {
          setUserState(parsedValue);
        } else {
          throw new Error();
        }
      } catch (error) {
        toast("Something went wrong!", { type: "error" });
        removeUserFromLocalStorage();

        // todo: wylogowanie i redirect
      }
    }
  }, []);

  const setUser = (payload: UserState | null) => {
    try {
      if (payload) {
        saveUserInLocalStorage(payload);
      } else {
        removeUserFromLocalStorage();
      }

      setUserState(payload);
    } catch (error) {
      toast("Something went wrong", { type: "error" });
    }
  };

  return {
    userState,
    setUserState: setUser,
  };
};

type UserContextType = ReturnType<typeof useUser>;

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider: FC<UserContextProviderProps> = ({
  children,
}) => {
  const value = useUser();

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
  const ctx = useContext(UserContext);

  if (!ctx) {
    throw new Error();
  }

  return ctx;
};
