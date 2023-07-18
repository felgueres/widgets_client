"use client";

import { cloneElement, useState } from "react"
import { Icons } from "../../constants";

export default function Home() {
  const [query, setQuery] = useState('')

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full mx-auto max-w-screen-md md:px-lg px-md py-lg">
        <span className="text-3xl md:text-4xl font-medium flex justify-center mb-[24px]">The answer to any question.</span>
        <div className="flex items-center justify-center">
          <div className="flex flex-col w-full border px-4 py-4 h-[114px] rounded-md shadow-sm">
            <textarea placeholder="Ask anything..." className="w-full resize-none outline-none" value={query} onChange={e => setQuery(e.target.value)} />
            <button className="bg-blue-500 self-end text-white rounded-full w-8 h-8 flex justify-center items-center">
              {cloneElement(Icons.arrow_right, { className: 'w-5 h-5 fill-current text-white' })}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
