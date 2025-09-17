import { useState } from "react";

function BoardModal({ onSave, onClose }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(title);
    setTitle("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-96 relative"
      >
        <h2 className="text-center text-2xl font-semibold mb-6 text-gray-900 tracking-tight">
          Create a new board
        </h2>

        <input
          type="text"
          placeholder="Board title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-100 rounded-lg px-4 py-3 mb-6 outline-none transition"
          required
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium shadow-sm"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default BoardModal;
