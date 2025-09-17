import { useState } from "react";
import Boards from "./components/boards/Boards";

export default function App() {
  const [cards, setCards] = useState([]);
  return (
     <div className="min-h-screen oklch(96.8% 0.007 247.896)">
       <Boards/>
     </div>
    );
}
