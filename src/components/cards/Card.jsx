import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline'
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

function Card({card}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: card.id
  });

  const style =  {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div 
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-full flex justify-between items-center bg-white rounded-xl shadow-md p-4 my-3"
    >
        {card.card_title}
        <div className="flex gap-2 shrink-0">
          <button onClick={(e) => e.stopPropagation()}>
            <TrashIcon className="h-6 w-6 text-red-500" />
          </button>
          <button onClick={(e) => e.stopPropagation()}>
            <PencilIcon className="h-6 w-6 text-blue-500" />
          </button>
        </div>
    </div>
  )
}

export default Card