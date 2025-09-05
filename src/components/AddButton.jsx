import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function AddButton({  }) {
    return (
      <button 
         className="fixed right-8 bottom-8 w-24 h-24 rounded-full flex items-center justify-center"
       >
        <PlusCircleIcon  className="w-16 h-16"/>
      </button>
    );
  }
  