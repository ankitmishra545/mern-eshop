import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
const TABLE_HEAD = ["#", "Name", "Email", " Created Date", "Action"];

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    const jsonResponse = await fetch("/api/user/getAllUsers");
    const jsoData = await jsonResponse.json();
    console.log(jsoData);
    setUsers(jsoData);
  };

  const handleDeleteUser = async (id) => {
    const jsonResponse = await fetch(`/api/user/delete/${id}`, {
      method: "DELETE",
    });
    const data = await jsonResponse.json();
    if (!jsonResponse.ok) {
      console.log(data.message);
    } else {
      const newUsers = users.filter((user) => user._id !== id);
      setUsers(newUsers);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="p-3">
      <table className="w-full border-collapse border border-slate-400 ">
        <thead>
          <tr className="">
            {TABLE_HEAD.map((head) => (
              <th key={head} className="p-2">
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
                <td className="w-1/12 text-center bg-white p-2">{index + 1}</td>
                <td className="w-2/12 text-center bg-white p-2">{name}</td>
                <td className="w-5/12 text-center bg-white p-2">{email}</td>
                <td className="w-3/12 text-center bg-white p-2">{new Date(createdAt).toLocaleDateString()}</td>
                <td className="w-1/12 text-center bg-white p-2">
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
