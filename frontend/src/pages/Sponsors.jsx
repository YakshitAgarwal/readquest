import Navbar from "../components/Navbar";

const Sponsors = ({ user, setUser }) => {
  return (
    <div className="flex min-h-screen flex-col bg-[#f9f9f9] p-6">
      <div className="flex justify-center">
        <Navbar user={user} setUser={setUser} />
      </div>
      <div></div>
    </div>
  );
};

export default Sponsors;
