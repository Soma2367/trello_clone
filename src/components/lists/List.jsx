import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import Card from "../cards/Card";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

function List({ list, cards, setCards }) {
  // const [cards, setCards] = useState([]);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [addCard, setAddCard] = useState(false);

  const { setNodeRef } = useDroppable({
    id: list.id, 
  });
  // useEffect(() => {
  //   const fetchCards = async () => {
  //     const { data, error } = await supabase
  //        .from("cards")
  //        .select("*")
  //        .eq("list_id", list.id)
  //        .order("created_at", { ascending: true });
  //      if(!error) setCards(data);
  //   }
  //   fetchCards();
  // }, [list.id]);

  const handleCreateCard = async () => {
    if(!newCardTitle.trim()) return;
    
    const { data, error } = await supabase
        .from("cards")
        .insert([{card_title: newCardTitle,list_id: list.id}])
        .select()
        .single();

        if(!error) {
          setCards((prev) => [...prev, data]);
          setNewCardTitle("");
          setAddCard(false);
        }
  }

  const listCards = cards.filter((card) => card.list_id === list.id)

  return (
    <div>
      <div className="min-w-[320px] bg-gray-50 rounded-lg p-3 ">
        <div className="text-center text-xl font-bold mb-2">{list.title}</div>

        <SortableContext
          items={listCards}
          strategy={verticalListSortingStrategy}
        >
          <div
            ref={setNodeRef}
            className="min-h-[100px]"
          >
            {
              listCards.map((card) => (
                <Card key={card.id} card={card}/>
              ))
            }
          </div>
        </SortableContext>
         
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
                 onClick={handleCreateCard}
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