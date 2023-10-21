import { FC, FormEvent, useRef, useState } from "react";
import { Button, Card, TextField } from "../../components";
import { toast } from "react-toastify";
import { httpClient } from "../../httpClient";
import { useUserContext } from "../../contexts/UserContext";
import { useQuestions } from "../../hooks/useQuestions";
import { Questions } from "./components/Questions/Questions";

export const QuizCreator: FC = () => {
  const ref = useRef<HTMLFormElement | null>(null);
  const { userState } = useUserContext();
  const [answers, setAnswers] = useState<number[]>([]);
  const { questions, refetchQuestions } = useQuestions();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formDataObject = Object.fromEntries(formData);

    const question = (formData.get("question") as string) || "";
    const answers = [];

    for (const prop in formDataObject) {
      if (prop.includes("answer")) {
        const answer = formDataObject[prop] as string;
        const idx = prop.split("-")[1];
        const isCorrect = formDataObject[`isCorrect-${idx}`] === "on";
        const answerPayload = {
          answer,
          isCorrect,
        };
        answers.push(answerPayload);
      }
    }

    if (
      question.trim().length < 3 ||
      answers.length < 2 ||
      answers.every((a) => !a.isCorrect)
    ) {
      return toast("Question is incorrect, please fill missing fields", {
        type: "error",
      });
    }

    const payload = {
      question,
      answers,
    };

    httpClient(`/api/v1/questions/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: JSON.stringify(userState?.user),
      },
      body: JSON.stringify(payload),
    }).then((data) => {
      console.log(data);
      toast("Well done - new question has been created", { type: "success" });
      refetchQuestions();
      ref?.current?.reset();
      setAnswers([]);
    });
  };

  return (
    <div className="xl:w-2/3 mx-auto">
      <Card className="mb-5">
        <h2 className="mb-4 text-sky-900 text-2xl">Add new question</h2>
        <form
          ref={ref}
          className="flex flex-col gap-4 w-full"
          onSubmit={handleSubmit}
        >
          <TextField
            required
            name="question"
            label="Question"
            placeholder="Enter your question..."
          />
          {answers.length > 0 && (
            <div className="flex gap-2 text-sky-900">
              <span>Answers</span>
              <span className="ml-auto">Is correct?</span>
            </div>
          )}
          {answers.map((answerIdx, index) => (
            <div key={answerIdx} className="flex gap-2">
              <TextField
                required
                name={`answer-${answerIdx}`}
                placeholder={`Enter answer ${index + 1}`}
              />
              <input name={`isCorrect-${answerIdx}`} type="checkbox" />
              <button
                onClick={() =>
                  setAnswers((prev) => prev.filter((el) => el !== answerIdx))
                }
              >
                &times;
              </button>
            </div>
          ))}
          <Button
            disabled={answers.length >= 5}
            onClick={() => {
              setAnswers((prev) => [...prev, Date.now()]);
            }}
          >
            + Add next answer
          </Button>
          <Button type="submit">Submit</Button>
        </form>
      </Card>
      <Card>
        <h2 className="mb-4 text-sky-900 text-2xl">Created questions</h2>
        <Questions questions={questions} onRemove={refetchQuestions} />
      </Card>
    </div>
  );
};
