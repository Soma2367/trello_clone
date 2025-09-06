import { useState } from "react"

function BoardModal({ onSave ,onClose }) {
    const [title, setTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(title);
        setTitle("");
    }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-96">
            <h2 className="flex justify-center text-xl font-bold mb-4">New Board</h2>
            <input 
               type="text"
               placeholder="Board title"
               value={title}
               onChange={ (e) => setTitle(e.target.value) }
               className="w-full border p-2 rounded mb-4"
               required
            />
            <div className="flex justify-around mt-2">
                <button type="submit" className="py-4 px-8 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Create
                </button>
                <button type="button" onClick={ onClose } className="py-4 px-8 bg-red-500 text-white rounded hover:bg-red-700">
                    Cancel
                </button>
            </div>

        </form>
    </div>
  )
}

export default BoardModal