const TaskModal = ({ task, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[500px] rounded-2xl bg-white p-8 text-center">
        <h2 className="text-[30px] font-semibold">{task.title}</h2>

        <p className="mt-3 text-gray-600 text-[18px]">
          Description: {task.description}
        </p>

        <div className="mt-6 flex gap-3 justify-center items-center">
          <button
            onClick={onClose}
            className="rounded-xl border px-5 py-3 cursor-pointer"
          >
            Cancel
          </button>

          <a
            href={task.formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-black px-5 py-3 text-white"
          >
            Complete Task
          </a>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
