import React, { useState } from 'react'
import './App.css'
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${API_KEY}`;
import Answers from './components/Answers'


//console.log("API KEY EXISTS:", !!API_KEY)
const App = () => {
  const [question, setQuestion] = useState("")
  const [result, setResult] = useState(undefined)

  const payload = {
    "contents": [{
      "parts": [{ "text": "Explain how AI works" }]
    }]
  }

  const askQuestion = async () => {

    try {
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "COntent-type": "application/json"
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const error = await response.json()
        console.log("API ERROR: ", error)
        return
      }

      response = await response.json()
      let dataString = response.candidates[0].content.parts[0].text
      dataString = dataString.split("*")
      dataString = dataString.map((item) => item.trim())
      //console.log(dataString)

      setResult(dataString)

    } catch (error) {
      console.log("Fetch error", error)
    }
  }

  return (
    <div className="grid grid-cols-5 h-screen text-center">
      <div className="col-span-1 bg-zinc-800">
      </div>

      <div className="col-span-4 p-10">
        <div className="container h-145 overflow-y-hidden overflow-x-hidden">
          <div className='text-zinc-300'>
            <ul>
            //{result}
              {
                result && result.map((items, index) => (
                  <li className='text-left p-10'><Answers ans={items} totalResult={result.length} index={index} /></li>
                ))
              }
              <Answers />
            </ul>
          </div>
        </div>

        <div className="bg-zinc-800 w-1/2 p-1 pr-5 text-white m-auto rounded-4xl border border-zinc-400 flex h-16 mt-20">
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
