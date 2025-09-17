import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

function List({ list }) {
  const [cards, setCards] = useState([]);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [addCard, setAddCard] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      const { data, error } = await supabase
         .from("cards")
         .select("*")
         .eq("list_id", list.id)
         .order("created_at", { ascending: true });
       if(!error) setCards(data);
    }
    fetchCards();
  }, [list.id]);

  return (
    <div className="flex gap-4 overflow-x-auto">
      <div className="min-w-[320px] bg-gray-50 rounded-lg p-3">
        <div className="text-center text-xl font-bold mb-2">{list.title}</div>
        <div className="min-w-[280px] bg-white rounded-xl shadow-md p-4">
           {addCard ? (
            <div className="flex flex-col gap-2">
              <textarea 
                type="text" 
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                placeholder="タイトルを入力するか、リンクを貼り付ける"
                rows={3}
                className="w-full border px-1 py-1 rounded-xl resize-none"
                autoFocus
              />

              <div className="flex gap-2">
                <button
                 className="px-3 py-1 bg-blue-500 text-white rounded"
                 onClick={() => {}}
                >
                  保存
                </button>
                <button
                 className="px-3 py-1 bg-gray-300 rounded"
                 onClick={() => setAddCard(false)}
                >
                  キャンセル
                </button>
              </div>
            </div>
           ) : (
            <button
             className="w-full text-gray-600 hover:text-gray-800"
             onClick={() => setAddCard(true)}
            >
             ＋もう一つのカードを追加する
            </button>
           )}
        </div>
      </div>
    </div>
  )
}

export default List