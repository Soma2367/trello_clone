import { useState, useEffect } from "react";
import BoardModal from "./BoardModal";
import { supabase } from "../supabaseClient";

function Boards() {
    const [boards, setBoards] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      const fetchBoards = async () => {
        const {data, error} = await supabase.from('boards').select('*').order('created_at', { ascending: true });
        if(!error) setBoards(data);
      };
      fetchBoards();
    }, []);

    const handleCreateBoard = async (title) => {
      const { data, error } = await supabase.from('boards').insert([{ title }]).select().single();
      if(!error) {
        setBoards([...boards, data]);
        setShowModal(false);
      }
    };


  return (
    <div className="m-3">
        <h1 className=" mt-4 ml-8 text-4xl font-bold" >Board</h1>
        <div className="mt-4">
          <div className="grid grid-cols-4 gap-4">
           <ul>
              {boards.map((board) => (
                <li
                  key={board.id}
                   className="border border-gray-200 rounded-md p-9 bg-gray-100 shadow-md hover:bg-gray-200"
                >
                  <div className="flex justify-center items-center font-bold text-xl">{board.title}</div>
                </li>
              ))}
           </ul>
           <button
              className="border border-gray-200 rounded-md p-9 bg-gray-100 shadow-md hover:bg-gray-200"
              onClick={ () => setShowModal(true)}
            >
                Create new board
            </button>
          </div>

          {showModal && <BoardModal onSave={handleCreateBoard} onClose={() => setShowModal(false)} />}
        </div>
    </div>
  )
} 

export default Boards;