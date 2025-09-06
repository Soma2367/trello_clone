import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import AddButton from "./AddButton";
import CardModal from "./CardModal";
import CardList from "./CardList";

function BoardView({board, onBack}) {
  return (
    <div className="p-4">
      <button onClick={onBack} className="mb-4 text-blue-600 hover:underline">
        ← Back to Boards
      </button>
      <h1 className="text-3xl font-bold mb-4">{board.title}</h1>

      <AddButton/>
    </div>
  )
}

export default BoardView