import { FC, ReactNode, useState } from "react";

type Mode = "sign-in" | "sign-up";

interface FormSwitcherProps {
  render: (mode: Mode) => ReactNode;
}

export const FormSwitcher: FC<FormSwitcherProps> = ({ render }) => {
  const [mode, setMode] = useState<Mode>("sign-in");
  return (
    <>
      <div className="flex gap-3">
        <label className="text-sky-950 text-lg">
          <input
            checked={mode === "sign-in"}
            className="sr-only peer"
            type="radio"
            name="sign-in-up"
            onChange={() => setMode("sign-in")}
          />
          <span className="peer-checked:underline cursor-pointer text-sky-600 peer-checked:text-sky-800 underline-offset-4">
            Sign in
          </span>
        </label>
        <label className="text-sky-950 text-lg">
          <input
            checked={mode === "sign-up"}
            className="sr-only peer"
            type="radio"
            name="sign-in-up"
            onChange={() => setMode("sign-up")}
          />
          <span className="peer-checked:underline cursor-pointer text-sky-600 peer-checked:text-sky-800 underline-offset-4">
            Sign up
          </span>
        </label>
      </div>
      {render(mode)}
    </>
  );
};
