import { useCallback, useEffect, useState } from "react";
import { useUserContext } from "../../../contexts/UserContext";
import { httpClient } from "../../../httpClient";

export interface Attempt {
  score: number;
  date: string;
  userId: number;
}

export const useAttempts = () => {
  const { userState } = useUserContext();
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAttempts = useCallback(() => {
    setIsLoading(true);
    httpClient(`/api/v1/users-answers/`, {
      headers: {
        authorization: JSON.stringify(userState?.user),
      },
    })
      .then((data) => {
        if (Array.isArray(data)) {
          setAttempts(data);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userState?.user]);

  useEffect(() => {
    fetchAttempts();
  }, [fetchAttempts]);

  return { attempts, isLoading, refetchAttempts: fetchAttempts };
};
