import { useState, useEffect } from "react"
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'
import List from "../lists/List"

function Card({card}) {
  return (
    <div className="w-full flex justify-between items-center bg-white rounded-xl shadow-md p-4 my-3">
        {card.card_title}
        <div className="flex gap-2 shrink-0">
          <button>
            <TrashIcon className="h-6 w-6 text-red-500" />
          </button>
          <button>
            <PencilIcon className="h-6 w-6 text-blue-500" />
          </button>
        </div>
    </div>
  )
}

export default Card