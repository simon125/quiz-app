import { useCallback, useEffect, useState } from "react";
import { useUserContext } from "../../../contexts/UserContext";
import { httpClient } from "../../../httpClient";

export interface User {
  id: number;
  name: string;
  answers: {
    score: number;
    id: number;
  }[];
}

export const useUsers = () => {
  const { userState } = useUserContext();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = useCallback(() => {
    setIsLoading(true);
    httpClient(`/api/v1/users/`, {
      headers: {
        authorization: JSON.stringify(userState?.user),
      },
    })
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userState?.user]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, isLoading, refetchUsers: fetchUsers };
};
