import { FC, FormEvent, useState } from "react";
import { Button, Card, TextField } from "../../components";
import { FormSwitcher } from "./components/FormSwitcher/FormSwitcher";
import { httpClient } from "../../httpClient";
import { Loader } from "../../components/Loader/Loader";
import { useUserContext } from "../../contexts/UserContext";
import { validateForm } from "./utils/validateForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const SignInUp: FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setUserState } = useUserContext();

  const handleSubmit = (mode: string) => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm({ name, password, repeatPassword, mode })) {
      return toast(
        "Provided credentials are incorrect! Name, password should have at least 5 and max 10 letters",
        { type: "error" }
      );
    }
    setIsLoading(true);
    httpClient(`/api/v1/users/${mode}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
      }),
    })
      .then((data) => {
        setUserState(data);
        setName("");
        setPassword("");
        setRepeatPassword("");
        navigate("/quiz");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Card className="w-80 mx-auto mt-10">
      {isLoading ? (
        <div className="flex justify-center my-8">
          <Loader />
        </div>
      ) : (
        <FormSwitcher
          render={(mode) => (
            <form
              onSubmit={handleSubmit(mode)}
              className="flex flex-col gap-3 mt-8"
            >
              <TextField
                value={name}
                onChange={({ target }) => setName(target.value)}
                label="Username"
                placeholder="Enter your username"
              />
              <TextField
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                type="password"
                label="Password"
                placeholder="5-8 characters"
              />
              {mode === "sign-up" && (
                <TextField
                  value={repeatPassword}
                  onChange={({ target }) => setRepeatPassword(target.value)}
                  type="password"
                  label="Repeat password"
                  placeholder="Repeat password"
                />
              )}
              <Button type="submit">Submit</Button>
            </form>
          )}
        />
      )}
    </Card>
  );
};
