import axios from "axios";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateTaskButton from "../components/CreateTaskButton";

const CreateTask = ({ user, setUser }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    companyName: "",
    description: "",
    formUrl: "",
    amount: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const payload = {
        ...taskData,
        amount: Number(taskData.amount),
      };

      const { data } = await axios.post("/api/tasks/create", payload, config);

      localStorage.setItem("taskInfo", JSON.stringify(data));

      alert("Task created successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f9f9f9] p-6">
      <div className="flex justify-center">
        <Navbar user={user} setUser={setUser} />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <form className="flex w-[600px] flex-col gap-6 rounded-2xl border border-gray-300 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-semibold text-center">Create Task</h1>

          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter the title for task"
              value={taskData.title}
              onChange={handleChange}
              required
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="companyName" className="text-sm font-medium">
              Company Name
            </label>

            <input
              id="companyName"
              name="companyName"
              type="text"
              placeholder="Enter the company name"
              value={taskData.companyName}
              onChange={handleChange}
              required
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="Description" className="text-sm font-medium">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              placeholder="Enter the details for your task"
              value={taskData.description}
              onChange={handleChange}
              required
              rows={4}
              className="resize-y rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="formUrl" className="text-sm font-medium">
              Form URL
            </label>

            <input
              id="formUrl"
              name="formUrl"
              type="url"
              placeholder="Enter the relevant link for your task"
              value={taskData.formUrl}
              onChange={handleChange}
              required
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="text-sm font-medium">
              Amount
            </label>

            <input
              id="amount"
              name="amount"
              type="number"
              placeholder="Enter the amount in dollars"
              value={taskData.amount}
              onChange={handleChange}
              required
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <CreateTaskButton loading={loading} onPaymentSuccess={handleSubmit} />
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
