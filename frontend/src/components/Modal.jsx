import { useState } from "react";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const Modal = ({ closeModal, setUser }) => {
  const [login, setLogin] = useState(true);

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-center gap-8 text-[24px]">
        <button
          onClick={() => setLogin(true)}
          className={`px-6 py-2 rounded-2xl ${
            login ? "bg-black text-white" : "bg-gray-100 text-gray-500"
          }`}
        >
          Login
        </button>

        <button
          onClick={() => setLogin(false)}
          className={`px-5 py-2 rounded-xl ${
            !login ? "bg-black text-white" : "bg-gray-100 text-gray-500"
          }`}
        >
          Signup
        </button>
      </div>

      <div>
        {login ? (
          <div>
            <Login closeModal={closeModal} setUser={setUser} />
          </div>
        ) : (
          <div>
            <Signup closeModal={closeModal} setUser={setUser} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
