import CompleteTaskButton from "./CompleteTaskButton";
import PayButton from "./PayButton";

const PayModal = ({ blogId, user, onUnlock }) => {
  return (
    <div className="py-6 px-2">
      <div className="flex justify-center item-center gap-10 mt-4">
        <PayButton blogId={blogId} user={user} onUnlock={onUnlock} />
        <CompleteTaskButton />
      </div>
    </div>
  );
};

export default PayModal;
