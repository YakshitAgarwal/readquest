import Navbar from "../components/Navbar";

const CompanyHome = ({ user, setUser }) => {
  return (
    <div className="flex min-h-screen flex-col bg-[#f9f9f9] p-6">
      <div className="flex justify-center">
        <Navbar user={user} setUser={setUser} />
      </div>
    </div>
  );
};

export default CompanyHome;
