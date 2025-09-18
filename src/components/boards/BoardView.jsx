import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import List from "../lists/List";

function BoardView({ board, onBack }) {
  const [lists, setLists] = useState([]);
  const [addingList, setAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");

  useEffect(() => {
    const fetchLists = async () => {
      const { data, error } = await supabase
         .from("lists")
         .select("*")
         .eq("board_id", board.id)
         .order("created_at", { ascending: true });
       if(!error) setLists(data);
    };
    fetchLists();
  }, [board.id]);

  const handleCreateList = async () => {
    if(!newListTitle.trim()) return;

    const { data, error } = await supabase
       .from("lists")
       .insert([{ title: newListTitle, board_id: board.id }])
       .select()
       .single();

    if(!error) {
      setLists((prev) => [...prev, data]);
      setNewListTitle("");
      setAddingList(false);
    }
  }

  return (
    <div className="p-6">
      <button
        onClick={onBack}
        className="mb-6 text-gray-700 hover:text-gray-900 font-medium transition-colors"
      >
        ← Back to Boards
      </button>

      <h1 className="text-4xl font-semibold mb-8 text-gray-900">{board.title}</h1>

      <div className="flex gap-4 overflow-x-auto">
        {lists.map((list) => (
          <List key={list.id} list={list}/>
        ))}

       {addingList ? (
        <div className="min-w-[320px] bg-gray-100 rounded-lg p-3">
            <div className="flex flex-col gap-2">
              <input 
                type="text" 
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
                placeholder="リスト名を入力"
                className="w-full border px-2 py-1 rounded"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={ handleCreateList }
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Add List
                </button>
                <button
                  onClick={() => setAddingList(false)}
                  className="px-3 py-1 text-gray-600 hover:underline"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
          onClick={() => setAddingList(true)}
          className="
            min-w-[320px] h-12
          bg-white/70 hover:bg-white
          text-gray-700 hover:text-gray-900
            rounded-md shadow-sm
            flex items-center justify-center
            transition-colors
          "
        >
          ＋ もう一つのリストを追加する
        </button>
        )}
      </div>
    </div>
  );
}

export default BoardView;
