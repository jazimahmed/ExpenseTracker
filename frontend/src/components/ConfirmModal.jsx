const ConfirmModal = ({ show, onCancel, onConfirm, title = "Confirm", message = "Are you sure?" }) => {
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50 ">
        <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md dark:bg-gray-900 ">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{title}</h2>
          <p className="text-gray-600 mb-6 dark:text-slate-400">{message}</p>
          <div className="flex justify-end space-x-3">
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-600"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 dark:bg-blue-600 hover:dark:bg-blue-800"
              onClick={onConfirm}
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmModal;
  