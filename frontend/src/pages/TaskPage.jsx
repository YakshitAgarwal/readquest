import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

const TaskPage = ({ user, setUser }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getTaskById = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`/api/tasks/${id}`, config);

        setTask(data);
      } catch (error) {
        console.log(error.response?.data);

        setError(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    getTaskById();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!task) {
    return <p>Task not found</p>;
  }
  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9f9] p-6 px-48 mb-10">
      <div className="flex justify-center">
        <Navbar user={user} setUser={setUser} />
      </div>
      <article className="mx-auto mt-10 rounded-2xl bg-white p-8 w-full">
        <h1 className="text-[68px] font-bold">{task.title}</h1>

        <p className="mt-4 text-[28px] text-gray-500">By {task.companyName}</p>

        <p className="text-[18px] text-gray-400">
          {new Date(task.creationDate).toLocaleDateString()}
        </p>

        <div className="flex justify-start items-center mt-8 text-[24px] gap-2">
          <label>Status:</label>
          <div>{task.isActive ? "Active" : "Completed"}</div>
        </div>

        <div className="flex justify-start items-center text-[24px] gap-2">
          <label>Description:</label>
          <div>{task.description}</div>
        </div>

        <div className="flex justify-start items-center text-[24px] gap-2">
          <label>Amount:</label>
          <div>${task.amount}</div>
        </div>

        <div className="flex justify-start items-center text-[24px] gap-2">
          <label>Unlocks Available:</label>
          <div>{task.unlocksAvailable}</div>
        </div>

        <div className="flex justify-start items-center text-[24px] gap-2">
          <label>Amount Used:</label>
          <div>${task.amountUsed}</div>
        </div>

        <div className="flex justify-start items-center text-[24px] gap-2">
          <label>Unlocks Used:</label>
          <div>{task.unlocksUsed}</div>
        </div>
      </article>
    </div>
  );
};

export default TaskPage;
