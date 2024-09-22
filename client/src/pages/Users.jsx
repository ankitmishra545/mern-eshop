import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
const TABLE_HEAD = ["#", "Name", "Email", " Created Date", "Action"];

// fetches the all users display for admin
const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    const jsonResponse = await fetch("/api/user/getAllUsers");
    const jsoData = await jsonResponse.json();
    setUsers(jsoData);
  };

  const handleDeleteUser = async (id) => {
    const jsonResponse = await fetch(`/api/user/delete/${id}`, {
      method: "DELETE",
    });
    const data = await jsonResponse.json();
    if (!jsonResponse.ok) {
    } else {
      const newUsers = users.filter((user) => user._id !== id);
      setUsers(newUsers);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="pt-5 md:p-3">
      <table className="w-full border-collapse border border-slate-400 max-h-[calc(100vh-150px)] ">
        <thead>
          <tr className="">
            {TABLE_HEAD.map((head) => (
              <th key={head} className="md:p-2">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {users?.map((user, index) => {
            const { name, email, _id: userId, createdAt } = user;
            return (
              <tr key={userId}>
                <td className="max-w-[5px]  md:w-1/12 text-center bg-white md:p-2">{index + 1}</td>
                <td className="max-w-[30px] overflow-x-scroll no-scrollbar md:w-2/12 text-center bg-white  md:p-2">
                  {name}
                </td>
                <td className="max-w-[50px] overflow-x-scroll no-scrollbar md:w-5/12 text-center bg-white  md:p-2">
                  {email}
                </td>
                <td className="max-w-[50px] overflow-x-scroll no-scrollbar md:w-3/12 text-center bg-white  md:p-2">
                  {new Date(createdAt).toLocaleDateString()}
                </td>
                <td className="max-w-[10px] md:w-1/12 text-center bg-white  md:p-2">
                  <button className="" onClick={() => handleDeleteUser(userId)}>
                    <MdDelete color="red" size="20px" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
