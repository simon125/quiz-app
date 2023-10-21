import { FC } from "react";
import { Card } from "../../../../components";
import { Question as QuestionType } from "../../../../hooks/useQuestions";

interface QuestionProps {
  question: QuestionType & { isCorrect?: boolean };
}

export const Question: FC<QuestionProps> = ({ question }) => {
  const quizSubmitted = typeof question.isCorrect === "boolean";

  return (
    <Card
      className={
        question.isCorrect
          ? "bg-green-200"
          : question.isCorrect === false
          ? "bg-red-200"
          : ""
      }
    >
      <h2 className="text-sky-900 text-lg font-light">{question.question}</h2>
      <div className="flex flex-col gap-3 mt-4">
        {question.answers.map(({ answer, id, isCorrect }) => (
          <label
            key={id}
            className={`${
              !quizSubmitted
                ? ""
                : isCorrect
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            <input
              disabled={quizSubmitted}
              name={`question-${question.id}-answer-${id}`}
              type="checkbox"
              className={`mr-5 p-2`}
            />
            {answer}
          </label>
        ))}
      </div>
    </Card>
  );
};
