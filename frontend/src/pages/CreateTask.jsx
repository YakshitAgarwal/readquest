import Navbar from "../components/Navbar";

const CreateTask = ({ user, setUser }) => {
  return (
    <div className="flex min-h-screen flex-col bg-[#f9f9f9] p-6">
      <div className="flex justify-center">
        <Navbar user={user} setUser={setUser} />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <form
          //onSubmit={}
          className="flex w-[600px] flex-col gap-6 rounded-2xl border border-gray-300 bg-white p-8 shadow-sm"
        >
          <h1 className="text-3xl font-semibold text-center">Create Blog</h1>

          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              Company Name
            </label>

            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter the company name"
              //value={blogData.title}
              //onChange={handleChange}
              required
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="body" className="text-sm font-medium">
              Description
            </label>

            <textarea
              id="body"
              name="body"
              placeholder="Enter the details for your task"
              //value={blogData.body}
              //onChange={handleChange}
              required
              rows={4}
              className="resize-y rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              Link
            </label>

            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter the relevant link for your task"
              //value={blogData.title}
              //onChange={handleChange}
              required
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              Amount
            </label>

            <input
              id="title"
              name="title"
              type="text"
              placeholder="Enter the amount for sponsor"
              //value={blogData.title}
              //onChange={handleChange}
              required
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <button
            type="submit"
            //disabled={loading}
            //onClick={handleSubmit}
            className="rounded-xl bg-black px-5 py-3 text-white cursor-pointer hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {/* {loading ? "Creating..." : "Create Blog"} */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
