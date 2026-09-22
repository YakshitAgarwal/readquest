import { useState } from "react";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import axios from "axios";
import Task from "../components/Task";

const CompanyHome = ({ user, setUser }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get("/api/tasks", config);
        console.log(data);
        setTasks(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getTasks();
  }, [user]);

  return (
    <div className="flex min-h-screen flex-col bg-[#f9f9f9] p-6">
      <div className="flex justify-center">
        <Navbar user={user} setUser={setUser} />
      </div>
      <main className="mx-auto mt-10 w-full px-4">
        {loading ? (
          <p>Loading Tasks...</p>
        ) : (
          <div className="grid grid-cols-4 gap-8">
            {tasks.map((task) => (
              <Task task={task} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CompanyHome;
