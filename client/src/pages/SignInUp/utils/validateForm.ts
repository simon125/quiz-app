interface Payload {
  password: string;
  repeatPassword: string;
  mode: string;
  name: string;
}

const longEnough = (str: string) =>
  !!str && str.trim().length <= 10 && str.trim().length >= 5;

export const validateForm = ({
  password,
  repeatPassword,
  mode,
  name,
}: Payload) => {
  if (
    (mode === "sign-in" && longEnough(password) && longEnough(name)) ||
    (mode === "sign-up" &&
      longEnough(password) &&
      longEnough(name) &&
      password === repeatPassword)
  ) {
    return true;
  }
  return false;
};
