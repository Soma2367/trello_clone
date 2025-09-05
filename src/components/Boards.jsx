import { useState } from "react"

function Boards() {
    const [boards, useBoards] = useState([]);

    
  return (
    <div className="m-3">
        <h1 className=" mt-4 ml-8 text-4xl font-bold" >Board</h1>
        <div className="mt-4">
          <button className="border border-gray-200 rounded-md p-9 bg-gray-100 shadow-md hover:bg-gray-200">
              <div className="items-center justify-center">Create new board</div>
          </button>
        </div>
    </div>
  )
}

export default Boards 