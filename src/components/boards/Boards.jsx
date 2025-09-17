import { useState, useEffect } from "react";
import BoardModal from "./BoardModal";
import { supabase } from "../../supabaseClient";
import BoardView from "./BoardView";

function Boards() {
  const [boards, setBoards] = useState([]);
  const [showBoardModal, setShowBoardModal] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);

  // 初期動作
  useEffect(() => {
    const fetchBoards = async () => {
      const { data, error } = await supabase
        .from("boards")
        .select("*")
        .order("created_at", { ascending: true });
      if (!error) setBoards(data);
    };
    fetchBoards();
  }, []);

  // Board名登録
  const handleCreateBoard = async (title) => {
    const { data, error } = await supabase
      .from("boards")
      .insert([{ title }])
      .select()
      .single();
    if (!error) {
      setBoards([...boards, data]);
      setShowBoardModal(false);
    }
  };

  // 個別Boardへ移動
  if (selectedBoard) {
    return (
      <BoardView board={selectedBoard} onBack={() => setSelectedBoard(null)} />
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-semibold mb-8 text-gray-900 tracking-tight">
        My Boards
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Board表示 */}
        {boards.map((board) => (
          <div
            key={board.id}
            onClick={() => setSelectedBoard(board)}
            className="cursor-pointer bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100"
          >
            <div className="flex justify-center items-center h-24 text-lg font-medium text-gray-800">
              {board.title}
            </div>
          </div>
        ))}

        {/* Create new board */}
        <button
          onClick={() => setShowBoardModal(true)}
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors p-6 shadow-sm hover:shadow-md"
        >
          <span className="text-2xl mb-2">＋</span>
          <span className="font-medium">Create new board</span>
        </button>
      </div>

      {/* Modal表示 */}
      {showBoardModal && (
        <BoardModal
          onSave={handleCreateBoard}
          onClose={() => setShowBoardModal(false)}
        />
      )}
    </div>
  );
}

export default Boards;
