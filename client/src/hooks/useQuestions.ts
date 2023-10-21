import { useCallback, useEffect, useState } from "react";
import { httpClient } from "../httpClient";
import { useUserContext } from "../contexts/UserContext";

export interface Question {
  question: string;
  id: number;
  answers: {
    id: number;
    isCorrect: boolean;
    answer: string;
  }[];
}

export const useQuestions = () => {
  const { userState } = useUserContext();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchQuestions = useCallback(() => {
    setIsLoading(true);
    httpClient(`/api/v1/questions/`, {
      headers: {
        authorization: JSON.stringify(userState?.user),
      },
    })
      .then((data) => {
        if (Array.isArray(data)) {
          setQuestions(data);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userState?.user]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return { questions, isLoading, refetchQuestions: fetchQuestions };
};
