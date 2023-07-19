"use client";

import { cloneElement, useState } from "react"
import { Icons } from "../../constants";
import { useRouter } from "next/navigation";

const examples = [
  'Weather in London?',
  'Calculate 4 * 2 - 3',
  'Current time',
]

export default function Home() {
  const [query, setQuery] = useState<string>("")
  const router = useRouter()
  const handleSubmit = () => { router.push(`/search?q=${encodeURIComponent(query)}`) }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full mx-auto max-w-screen-md md:px-lg px-md py-lg p-4">
        <div className="flex items-center justify-center">
          <div className="flex flex-col w-full border px-4 py-4 h-[114px] rounded-md shadow-sm">
            <textarea placeholder="Ask anything..."
              className="w-full resize-none outline-none"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <button onClick={handleSubmit} className="bg-blue-500 self-end text-white rounded-full w-8 h-8 flex justify-center items-center">
              {cloneElement(Icons.arrow_right, { className: 'w-5 h-5 fill-current text-white' })}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        {
          examples.map((example, i) => (
            <button key={i} onClick={() => router.push(`/search?q=${encodeURIComponent(example)}`)} className="hover:underline">
              {example}
            </button>
          ))
        }
      </div>
    </div>
  )
}
