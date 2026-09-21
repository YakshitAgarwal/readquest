import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

const Signup = ({ closeModal, setUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isCompany: false,
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleIdentityChange = (isCompany) => {
    setFormData({
      ...formData,
      isCompany,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post("/api/users/signup", formData, config);

      localStorage.setItem("userInfo", JSON.stringify(data));

      setUser(data);

      closeModal();
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Account type</label>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!formData.isCompany}
                onChange={() => handleIdentityChange(false)}
                className="h-5 w-5 cursor-pointer accent-black"
              />

              <span className="text-sm">User</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isCompany}
                onChange={() => handleIdentityChange(true)}
                className="h-5 w-5 cursor-pointer accent-black"
              />

              <span className="text-sm">Company</span>
            </label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-white cursor-pointer hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <LoaderCircle size={20} className="animate-spin" />
            Signing Up...
          </>
        ) : (
          "Sign Up"
        )}
      </button>
    </form>
  );
};

export default Signup;
