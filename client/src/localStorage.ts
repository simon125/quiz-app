// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveUserInLocalStorage = (payload: any) => {
  return localStorage.setItem("quizUserState", JSON.stringify(payload));
};

export const removeUserFromLocalStorage = () => {
  return localStorage.removeItem("quizUserState");
};

export const getUserFromLocalStorage = () => {
  return localStorage.getItem("quizUserState");
};
