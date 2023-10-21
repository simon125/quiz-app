import { FC, Fragment, useState } from "react";
import { Button, Card } from "../../components";
import { useUsers } from "./hooks/useUsers";
import { httpClient } from "../../httpClient";
import { useUserContext } from "../../contexts/UserContext";
import { toast } from "react-toastify";

export const Users: FC = () => {
  const { userState } = useUserContext();
  const { users, refetchUsers } = useUsers();
  const [openAttempts, setOpenAttempts] = useState<Array<number>>([]);

  const removeUser = (id: number) => {
    httpClient(`/api/v1/users/${id}`, {
      headers: {
        authorization: JSON.stringify(userState?.user),
      },
      method: "DELETE",
    }).then(() => {
      toast("You succesfully removed user");
      refetchUsers();
    });
  };

  return (
    <div>
      <Card>
        <div className="flex justify-between items-center mb-9">
          <h2 className="mb-4 text-sky-900 text-2xl">Users Scores</h2>
          <Button onClick={refetchUsers}>Refresh</Button>
        </div>
        <div className="overflow-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="border-b border-sky-600 text-sky-900 font-semibold text-xs  uppercase">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4 text-end">Actions</th>
              </tr>
            </thead>
            <tbody className=" text-sky-700">
              {users.length === 0 && (
                <tr className="border-b border-sky-200">
                  <td colSpan={2} className="px-6 py-6 text-center">
                    No users in the system
                  </td>
                </tr>
              )}
              {users.map(({ name, id, answers }) => {
                return (
                  <Fragment key={id}>
                    <tr className="border-b border-sky-200">
                      <td className="px-6 py-4 max-w-sm ">{name}</td>
                      <td className="px-6 py-4 text-end">
                        <Button
                          variant="gray"
                          className="mr-3"
                          onClick={() =>
                            openAttempts.includes(id)
                              ? setOpenAttempts((prev) =>
                                  prev.filter((o) => o !== id)
                                )
                              : setOpenAttempts([...openAttempts, id])
                          }
                        >
                          Show answers
                        </Button>
                        <Button onClick={() => removeUser(id)} variant="red">
                          Delete
                        </Button>
                      </td>
                    </tr>
                    <tr
                      className={`border-b border-sky-200 ${
                        openAttempts.includes(id) ? "" : "sr-only"
                      }`}
                    >
                      <td colSpan={3} className="px-6 py-4">
                        <ul>
                          {answers.map(({ score, id: answerId }, index) => (
                            <li key={answerId}>
                              {index + 1}.{" "}
                              <span className="font-semibold">{score} %</span>
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
      </Card>
    </div>
  );
};
