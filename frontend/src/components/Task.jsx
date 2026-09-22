import { Link } from "react-router-dom";

const Task = ({ task }) => {
  return (
    <Link
      to={`/tasks/${task._id}`}
      className="flex flex-col justify-between gap-14 rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-md"
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-[44px] leading-[1] font-semibold">{task.title}</h1>

        <p className="text-gray-600 text-[18px]">
          {task.description.slice(0, 95)}
          {task.description.length > 95 && "..."}
        </p>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-center items-center gap-2 text-[24px]">
          <label>Date:</label>
          <h1>{new Date(task.creationDate).toLocaleDateString()}</h1>
        </div>
        <div className="flex justify-center items-center gap-2 text-[24px]">
          <label>Status:</label>
          <h1>{task.isActive ? "Active" : "Completed"}</h1>
        </div>
        <div className="flex justify-center items-center gap-2 text-[24px]">
          <label>Unlocks Available:</label>
          <h1>{task.unlocksAvailable}</h1>
        </div>
      </div>
      <div className="flex justify-center items-center bg-black text-white py-2 text-[20px] rounded-2xl">
        <button>Get Details</button>
      </div>
    </Link>
  );
};

export default Task;
