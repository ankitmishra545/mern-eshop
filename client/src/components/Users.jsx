import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
const TABLE_HEAD = ["#", "Name", "Email", " Created Date", "Action"];

const Users = () => {
  const [users, setUsers] = useState();

  const fetchAllUsers = async () => {
    const jsonResponse = await fetch("/shop/admin/getAllUsers");
    const jsoData = await jsonResponse.json();
    setUsers(jsoData);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      <table className="w-full border-[1px]">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody className="w-full">
          <td className="bg-red-300">1</td>
          <td>Ankit</td>
          <td>ankit@mail.com</td>
          <td>time</td>
          <td>
            <button className="">
              <MdDelete color="red" />
            </button>
          </td>
        </tbody>
      </table>
    </div>
  );
};

export default Users;
