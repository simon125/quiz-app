import { FC, FormEvent, useState } from "react";
import { Card } from "../../components";
import { Question } from "./components/Question/Question";
import { SubmitPanel } from "./components/SubmitPanel/SubmitPanel";
import {
  Question as QuestionType,
  useQuestions,
} from "../../hooks/useQuestions";
import { Loader } from "../../components/Loader/Loader";
import { useAttempts } from "./hooks/useAttempts";
import { httpClient } from "../../httpClient";
import { useUserContext } from "../../contexts/UserContext";

export const Quiz: FC = () => {
  const { userState } = useUserContext();
  const { isLoading, questions } = useQuestions();
  const { attempts, refetchAttempts } = useAttempts();

  const [results, setResults] = useState<
    (QuestionType & { isCorrect: boolean })[]
  >([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const formDataList = Object.keys(Object.fromEntries(formData));

    const result = questions.map((q) => {
      const usersAnswers = formDataList
        .filter((userAnswer) => userAnswer.includes(`question-${q.id}`))
        .map((el) => el.split(`question-${q.id}-`)[1]);
      const usersAnswersWithResult = q.answers.map((el) => {
        let isOk = false;
        if (el.isCorrect) {
          isOk = usersAnswers.includes(`answer-${el.id}`);
        } else {
          isOk = !usersAnswers.includes(`answer-${el.id}`);
        }
        return isOk;
      });

      const isCorrect = usersAnswersWithResult.every(Boolean);

      return {
        ...q,
        isCorrect,
      };
    });

    setResults(result);

    const amountOfCorrect = result.reduce((acc, el) => {
      if (el.isCorrect) {
        return acc + 1;
      }
      return acc;
    }, 0);

    httpClient(`/api/v1/users-answers/`, {
      method: "POST",
      headers: {
        authorization: JSON.stringify(userState?.user),
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userState?.user.id,
        score: Math.floor((amountOfCorrect / result.length) * 100),
      }),
    }).then(() => {
      refetchAttempts();
    });
  };

  const finalQuestions = results.length > 0 ? results : questions;

  return (
    <div className="pb-20">
      <Card className="mb-10">
        <p className="text-sky-900 text-xl">
          Solve all the questions. <br /> Be careful - some of the questions may
          have more than one correct answer. <br />
          You can always retake the quiz. Good luck!
        </p>
        <p className="text-sky-900 mt-2">
          Amount of attempts:{" "}
          <span className="font-semibold">{attempts.length}</span>
        </p>
        <p className="text-sky-900 mt-2">
          Your previous score:{" "}
          <span className="font-semibold">
            {attempts[attempts.length - 1]?.score !== undefined
              ? attempts[attempts.length - 1]?.score
              : "-"}
          </span>
        </p>
      </Card>
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit}
        onReset={(e) => {
          setResults([]);
          e.currentTarget.reset();
        }}
      >
        {isLoading ? (
          <Card className="flex justify-center items-center h-52">
            <Loader />
          </Card>
        ) : (
          finalQuestions.map((question) => (
            <Question question={question} key={question.id} />
          ))
        )}

        <SubmitPanel />
      </form>
    </div>
  );
};
