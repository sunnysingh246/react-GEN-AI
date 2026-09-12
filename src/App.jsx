import React, { useEffect, useRef, useState } from 'react'
import './App.css'

import RecentSearch from './components/RecentSearch'
import QuestionAndAnswer from './components/QuestionAndAnswer'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${API_KEY}`

const App = () => {
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState([])

  const [recentHistory, setRecentHistory] = useState(() => {
    const history = localStorage.getItem('history')
    return history ? JSON.parse(history) : []
  })

  const [selectedHistory, setSelectedHistory] = useState('')
  const [loader, setLoader] = useState(false)

  const scrollToAns = useRef(null)

  // =========================
  // ASK QUESTION
  // =========================

  const askQuestion = async () => {
    if (!question && !selectedHistory) {
      return
    }

    const payLoadData = question || selectedHistory

    // Save question to history
    if (question) {
      const history = JSON.parse(
        localStorage.getItem('history') || '[]'
      )

      const updatedHistory = [question, ...history]

      localStorage.setItem(
        'history',
        JSON.stringify(updatedHistory)
      )

      setRecentHistory(updatedHistory)
    }

    const payload = {
      contents: [
        {
          parts: [
            {
              text: payLoadData
            }
          ]
        }
      ]
    }

    setLoader(true)

    try {
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const error = await response.json()
        console.log('API ERROR:', error)
        return
      }

      response = await response.json()

      let dataString =
        response.candidates[0].content.parts[0].text

      dataString = dataString.split('*')
      dataString = dataString.map((item) => item.trim())

      setResult((prev) => [
        ...prev,
        {
          type: 'q',
          text: payLoadData
        },
        {
          type: 'a',
          text: dataString
        }
      ])

      setQuestion('')

      setTimeout(() => {
        if (scrollToAns.current) {
          scrollToAns.current.scrollTop =
            scrollToAns.current.scrollHeight
        }
      }, 100)

    } catch (error) {
      console.log('Fetch error:', error)
    } finally {
      setLoader(false)
    }
  }

  // =========================
  // ENTER KEY
  // =========================

  const isEnter = (event) => {
    if (event.key === 'Enter') {
      askQuestion()
    }
  }

  // =========================
  // SELECT HISTORY
  // =========================

  useEffect(() => {
    if (selectedHistory) {
      askQuestion()
    }
  }, [selectedHistory])

  // =========================
  // DARK MODE
  // =========================

  const [darkMode, setDarkMode] = useState('dark')

  useEffect(() => {
    if (darkMode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // =========================
  // UI
  // =========================

  return (
    <div className="min-h-screen">

      <div className="grid grid-cols-5 h-screen">

        {/* ================= SIDEBAR ================= */}

        <RecentSearch
          recentHistory={recentHistory}
          setRecentHistory={setRecentHistory}
          setSelectedHistory={setSelectedHistory}
        />

        {/* ================= MAIN CONTENT ================= */}

        <div className="col-span-4 p-10 flex flex-col">

          <h1
            className=" text-4xl text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-violet-700"
          >
            Hello user, ask me anything
          </h1>

          {/* ================= LOADER ================= */}

          {loader && (
            <div className="flex justify-center mt-5">

              <svg width="60" height="60" viewBox="0 0 44 44">

                <g transform="rotate(0 22 22)">
                  <circle cx="22" cy="4" r="3" fill="#60A5FA" >
                    <animate attributeName="cy" values="4;40;4" dur="1.5s" begin="0s" repeatCount="indefinite" />

                  </circle>
                </g>

                <g transform="rotate(45 22 22)">
                  <circle
                    cx="22"
                    cy="4"
                    r="3"
                    fill="#60A5FA"
                  >
                    <animate
                      attributeName="cy"
                      values="4;40;4"
                      dur="1.5s"
                      begin="0.1875s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>

                <g transform="rotate(90 22 22)">
                  <circle
                    cx="22"
                    cy="4"
                    r="3"
                    fill="#60A5FA"
                  >
                    <animate
                      attributeName="cy"
                      values="4;40;4"
                      dur="1.5s"
                      begin="0.375s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>

                <g transform="rotate(135 22 22)">
                  <circle
                    cx="22"
                    cy="4"
                    r="3"
                    fill="#60A5FA"
                  >
                    <animate
                      attributeName="cy"
                      values="4;40;4"
                      dur="1.5s"
                      begin="0.5625s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>

                <g transform="rotate(180 22 22)">
                  <circle
                    cx="22"
                    cy="4"
                    r="3"
                    fill="#60A5FA"
                  >
                    <animate
                      attributeName="cy"
                      values="4;40;4"
                      dur="1.5s"
                      begin="0.75s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>

                <g transform="rotate(225 22 22)">
                  <circle
                    cx="22"
                    cy="4"
                    r="3"
                    fill="#60A5FA"
                  >
                    <animate
                      attributeName="cy"
                      values="4;40;4"
                      dur="1.5s"
                      begin="0.9375s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>

                <g transform="rotate(270 22 22)">
                  <circle
                    cx="22"
                    cy="4"
                    r="3"
                    fill="#60A5FA"
                  >
                    <animate
                      attributeName="cy"
                      values="4;40;4"
                      dur="1.5s"
                      begin="1.125s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>

                <g transform="rotate(315 22 22)">
                  <circle
                    cx="22"
                    cy="4"
                    r="3"
                    fill="#60A5FA"
                  >
                    <animate
                      attributeName="cy"
                      values="4;40;4"
                      dur="1.5s"
                      begin="1.3125s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>

              </svg>

            </div>
          )}

          {/* ================= ANSWERS ================= */}

          <div
            ref={scrollToAns}
            className="
              w-full
              flex-1
              overflow-y-auto
              overflow-x-hidden
              mt-5
            "
          >

            <div className="dark:text-zinc-300 text-zinc-800">

              <ul className="w-full">

                {result.map((item, index) => (
                  <QuestionAndAnswer key={key} item={item} index={index} />
                ))}

              </ul>

            </div>

          </div>

          {/* ================= INPUT ================= */}

          <div
            className=" bg-red-100 dark:bg-zinc-800 dark:text-white text-zinc-800 w-1/2 p-1 pr-5 m-auto rounded-4xl border border-zinc-400 flex h-15 mt-5" >

            <input
              onKeyDown={isEnter}
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
              type="text"
              className=" w-full h-full p-3 outline-none bg-transparent"
              placeholder="Ask me anything"
            />

            <button
              onClick={askQuestion}
              className="px-4 cursor-pointer"
            >
              Ask
            </button>

          </div>

          {/* ================= THEME SWITCH ================= */}

          <select
            onChange={(event) =>
              setDarkMode(event.target.value)
            }
            value={darkMode}
            className="
              fixed
              bottom-0
              left-0
              p-3
              bg-zinc-800
              text-white
              rounded-tr-xl
            "
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>

        </div>

      </div>

    </div>
  )
}

export default App