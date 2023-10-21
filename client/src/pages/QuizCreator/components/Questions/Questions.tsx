import { FC, Fragment, useState } from "react";
import { Button } from "../../../../components";
import { Question } from "../../../../hooks/useQuestions";
import { httpClient } from "../../../../httpClient";
import { useUserContext } from "../../../../contexts/UserContext";

interface QuestionsProps {
  questions: Question[];
  onRemove: () => void;
}

export const Questions: FC<QuestionsProps> = ({ questions, onRemove }) => {
  const { userState } = useUserContext();
  const [openAnswers, setOpenAnswers] = useState<Array<number>>([]);

  const removeQuestion = (id: number) => {
    httpClient(`/api/v1/questions/${id}`, {
      method: "DELETE",
      headers: {
        authorization: JSON.stringify(userState?.user),
      },
    }).then(() => {
      onRemove();
    });
  };

  return (
    <div className="overflow-auto">
      <table className="w-full text-left min-w-[600px]">
        <thead>
          <tr className="border-b border-sky-600 text-sky-900 font-semibold text-xs  uppercase">
            <th className="px-6 py-4">Questions</th>
            <th className="px-6 py-4 text-end">Actions</th>
          </tr>
        </thead>
        <tbody className=" text-sky-700">
          {questions.length === 0 && (
            <tr className="border-b border-sky-200">
              <td colSpan={2} className="px-6 py-6 text-center">
                No questions in the system
              </td>
            </tr>
          )}
          {questions.map(({ question, id, answers }) => {
            return (
              <Fragment key={id}>
                <tr className="border-b border-sky-200">
                  <td className="px-6 py-4 max-w-sm ">{question}</td>
                  <td className="px-6 py-4 text-end">
                    <Button
                      variant="gray"
                      className="mr-3"
                      onClick={() =>
                        openAnswers.includes(id)
                          ? setOpenAnswers((prev) =>
                              prev.filter((o) => o !== id)
                            )
                          : setOpenAnswers([...openAnswers, id])
                      }
                    >
                      Show answers
                    </Button>
                    <Button onClick={() => removeQuestion(id)} variant="red">
                      Delete
                    </Button>
                  </td>
                </tr>
                <tr
                  className={`border-b border-sky-200 ${
                    openAnswers.includes(id) ? "" : "sr-only"
                  }`}
                >
                  <td colSpan={3} className="px-6 py-4">
                    <ul>
                      {answers.map(({ answer, id, isCorrect }) => (
                        <li
                          key={id}
                          className={isCorrect ? "text-green-500" : ""}
                        >
                          {answer}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
