import { toast } from "react-toastify";

export const httpClient = async (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => {
  try {
    const response = await fetch(input, init);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error();
    }
  } catch (error) {
    toast("Something went wrong!", { type: "error" });
  }
};
