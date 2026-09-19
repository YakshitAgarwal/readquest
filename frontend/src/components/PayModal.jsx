import PayButton from "./PayButton";

const PayModal = ({ blogId, user, onUnlock }) => {
  return (
    <div className="py-6 px-2">
      <div className="flex justify-center item-center gap-10 mt-4">
        <PayButton blogId={blogId} user={user} onUnlock={onUnlock} />
        <button className="text-white bg-black px-6 py-3 rounded-2xl text-[20px] w-full cursor-pointer">
          <p>Complete</p>
          <p>a task</p>
        </button>
      </div>
    </div>
  );
};

export default PayModal;
