import { useState } from "react";
import axios from "axios";
import TaskModal from "./TaskModal";

const CompleteTaskButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCompleteTask = async () => {
    try {
      setLoading(true);

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const { data } = await axios.get("/api/tasks/random", {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      setTask(data);
      setShowModal(true);
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleCompleteTask}
        disabled={loading}
        className="w-full cursor-pointer rounded-2xl bg-black px-6 py-3 text-[20px] text-white disabled:opacity-50"
      >
        <p>{loading ? "Loading..." : "Complete"}</p>
        {!loading && <p>a task</p>}
      </button>

      {showModal && (
        <TaskModal task={task} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default CompleteTaskButton;
