import React, { useState } from 'react'
import './App.css'
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const App = () => {
  const [question, setQuestion] = useState("")
  const [result, setResult] = useState(undefined)

  const payload = {
    "contents": [{
      "parts": [{ "text": "Explain how AI works" }]
    }]
  }

  const askQuestion = async () => {
    let response = await fetch(`${GEMINI_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(payload)
    })

    response = await response.json()

    console.log(response.candidates[0].content.parts[0].text)

  }

  return (
    <div className="grid grid-cols-5 h-screen text-center">
      <div className="col-span-1 bg-zinc-800">
      </div>

      <div className="col-span-4 p-10">
        <div className="container h-110">
          <div className='text-white'>{result}</div>
        </div>

        <div className="bg-zinc-800 w-1/2 p-1 pr-5 text-white m-auto rounded-4xl border border-zinc-400 flex h-16">
          <input
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            type="text"
            className="w-full h-full p-3 outline-none"
            placeholder="Ask me anything"
          />
          <button onClick={askQuestion}>Ask</button>
        </div>
      </div>
    </div>
  )
}

export default App
