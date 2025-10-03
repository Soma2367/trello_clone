import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import List from "../lists/List";
import { DndContext, closestCorners } from "@dnd-kit/core";

function BoardView({ board, onBack }) {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);//一元管理
  const [addingList, setAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data: listsData, error: listsError } = await supabase
         .from("lists")
         .select("*")
         .eq("board_id", board.id)
         .order("created_at", { ascending: true });

         if(listsData) {
          const { data: cardsData, error: cardsError } = await supabase
            .from("cards")
            .select("*")
            .order("created_at", { ascending: true });
          
          const filteredCards = cardsData?.filter(card => 
            listsData.some(list => list.id === card.list_id)
          );

          if(!cardsError) setCards(filteredCards || []);
         }
         if(!listsError) setLists(listsData || []); 
    };
    fetchData();
  }, [board.id]);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
  
    if(!over) return;
  
    const activeCard = cards.find(card => card.id === active.id);
    
    let targetListId;
    const overCard = cards.find(card => card.id === over.id);
    
    if (overCard) {
      targetListId = overCard.list_id;
    } else {
      targetListId = over.id;
    }
  
    if(!activeCard) return;
  
    if (activeCard.list_id === targetListId && overCard) {
      const listCards = cards.filter(c => c.list_id === activeCard.list_id);
      const oldIndex = listCards.findIndex(c => c.id === active.id);
      const newIndex = listCards.findIndex(c => c.id === over.id);
  
      if (oldIndex !== newIndex) {
        const reorderedCards = [...listCards];
        const [movedCard] = reorderedCards.splice(oldIndex, 1);
        reorderedCards.splice(newIndex, 0, movedCard);
  
        const otherCards = cards.filter(c => c.list_id !== activeCard.list_id);
        setCards([...otherCards, ...reorderedCards]);
      }
    }
  
    else if (activeCard.list_id !== targetListId) {
      await supabase
        .from("cards")
        .update({ list_id: targetListId })
        .eq("id", activeCard.id);
  
      setCards(cards.map(card =>
        card.id === activeCard.id
          ? { ...card, list_id: targetListId }
          : card
      ));
    }
  };
  

  return (
    <div className="p-6">
      <button
        onClick={onBack}
        className="mb-6 text-gray-700 hover:text-gray-900 font-medium transition-colors"
      >
        ← Back to Boards
      </button>

      <h1 className="text-4xl font-semibold mb-8 text-gray-900">{board.title}</h1>

      <DndContext 
        collisionDetection={closestCorners}  
        onDragEnd={handleDragEnd}           
      >
       <div className="flex gap-4 overflow-x-auto items-start">
          {lists.map((list) => (
            <List 
              key={list.id} 
              list={list}
              cards={cards}        
              setCards={setCards}  
            />
          ))}

       {addingList ? (
        <div className="min-w-[320px] bg-gray-100 rounded-md py-3">
          <div className="flex flex-col gap-2 p-2">
              <input 
                type="text" 
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
                placeholder="リスト名を入力"
                className="w-full border px-2 py-1 rounded"
                autoFocus
              />
              <div className="flex">
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
      </DndContext>
    </div>
  );
}

export default BoardView;
