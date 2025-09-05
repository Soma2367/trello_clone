import { useState } from "react";
import AddButton from "./components/AddButton";
import Modal from "./components/Modal";
import CardList from "./components/CardList";
import Boards from "./components/Boards";

export default function App() {
  const [cards, setCards] = useState([]);
  return (
     <div className="min-h-screen oklch(96.8% 0.007 247.896)">
       <Boards/>
     </div>
    );
}
