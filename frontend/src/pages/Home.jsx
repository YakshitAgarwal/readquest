import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9f9] p-6">
      <div className="px-110">
        <Navbar />
      </div>
      <div>Blogs</div>
    </div>
  );
};

export default Home;
