import React, { useEffect, useRef, useState } from 'react'
import './App.css'
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${API_KEY}`;
import RecentSearch from './components/RecentSearch';
import QuestionAndAnswer from './components/QuestionAndAnswer';



const App = () => {
  const [question, setQuestion] = useState("")
  const [result, setResult] = useState([])
  const [recentHistory, setRecentHistory] = useState(JSON.parse(localStorage.getItem('history')))
  const [selectedHistory, setSelectedHistory] = useState('')
  const scrollToAns = useRef()
  const [loader, setLoader] = useState(false)


  const askQuestion = async () => {
    if (!question && !selectedHistory) { return false }

    if (question) {
      if (localStorage.getItem('history')) {
        let history = JSON.parse(localStorage.getItem('history'))
        history = [question, ...history]
        localStorage.setItem('history', JSON.stringify('history'))
        setRecentHistory(history)
      } else {
        localStorage.setItem('history', JSON.stringify(question))
        setRecentHistory([question])
      }
    }

    const payLoadData = question ? question : selectedHistory
    const payload = {
      "contents": [{
        "parts": [{ "text": payLoadData }]
      }]
    }
    setLoader(true)

    try {
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
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

      setResult([...result, { type: 'q', text: question ? question : selectedHistory }, { type: 'a', text: dataString }])
      setQuestion('')

      setTimeout(() => {
        scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
      }, 500)

      setLoader(false)

    } catch (error) {
      console.log("Fetch error", error)
    }
  }
  console.log(result)



  const isEnter = (event) => {
    if (event.key == 'Enter')
      askQuestion();
  }

  useEffect(() => {
    console.log(selectedHistory)
    askQuestion()
  }, [selectedHistory])

  // dark mode
  const [darkMode, setDarkMode] = useState('dark')

  useEffect(() => {
    console.log(darkMode)
    if (darkMode == 'darkMode') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className={darkMode == 'dark' ? dark : light}>
      <div className="grid grid-cols-5 h-screen text-center">

        <select
          onChange={(event) => setDarkMode(event.target.value)}
          className='fixed text-white bottom-0 p-5'>
          <option value="Dark">Dark</option>
          <option value="Light">Light</option>
        </select>

        <RecentSearch
          recentHistory={recentHistory}
          setRecentHistory={recentHistory}
          setSelectedHistory={setSelectedHistory}
        />

        <div className="col-span-4 p-10">
          <h1
            className='text-4xl bg-clip-text text-transparent bg-gradient-to-rt from pink-700 to voilet-700'>
            Hello user , ask me anything
          </h1>

          {
            loader ? <svg width="60" height="60" viewBox="0 0 44 44"><g transform="rotate(0 22 22)"><circle cx="22" cy="4" r="3" fill="#60A5FA"><animate attributeName="cy" values="4;40;4" dur="1.5s" begin="0s" repeatCount="indefinite"></animate></circle></g><g transform="rotate(45 22 22)"><circle cx="22" cy="4" r="3" fill="#60A5FA"><animate attributeName="cy" values="4;40;4" dur="1.5s" begin="0.1875s" repeatCount="indefinite"></animate></circle></g><g transform="rotate(90 22 22)"><circle cx="22" cy="4" r="3" fill="#60A5FA"><animate attributeName="cy" values="4;40;4" dur="1.5s" begin="0.375s" repeatCount="indefinite"></animate></circle></g><g transform="rotate(135 22 22)"><circle cx="22" cy="4" r="3" fill="#60A5FA"><animate attributeName="cy" values="4;40;4" dur="1.5s" begin="0.5625s" repeatCount="indefinite"></animate></circle></g><g transform="rotate(180 22 22)"><circle cx="22" cy="4" r="3" fill="#60A5FA"><animate attributeName="cy" values="4;40;4" dur="1.5s" begin="0.75s" repeatCount="indefinite"></animate></circle></g><g transform="rotate(225 22 22)"><circle cx="22" cy="4" r="3" fill="#60A5FA"><animate attributeName="cy" values="4;40;4" dur="1.5s" begin="0.9375s" repeatCount="indefinite"></animate></circle></g><g transform="rotate(270 22 22)"><circle cx="22" cy="4" r="3" fill="#60A5FA"><animate attributeName="cy" values="4;40;4" dur="1.5s" begin="1.125s" repeatCount="indefinite"></animate></circle></g><g transform="rotate(315 22 22)"><circle cx="22" cy="4" r="3" fill="#60A5FA"><animate attributeName="cy" values="4;40;4" dur="1.5s" begin="1.3125s" repeatCount="indefinite"></animate></circle></g></svg> : null
          }

          <div ref={scrollToAns} className="container h-145 overflow-y-hidden overflow-x-hidden">
            <div className='dark:text-zinc-300 text-zinc-800'>
              <ul>

                {
                  result.map((item, index) => (
                    <QuestionAndAnswer
                      key={index}
                      item={item}
                      index={index}
                    />
                  ))
                }
              </ul>
            </div>
          </div>

          <div className="dark:bg-zinc-800 bg-red-100 w-1/2 p-1 pr-5 dark:text-white text-zinc-800 m-auto rounded-4xl border border-zinc-400 flex h-16 mt-20">
            <input
              onKeyDown={isEnter}
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
              type="text"
              className="w-full h-full p-3 outline-none"
              placeholder="Ask me anything"
            />
            <button onClick={askQuestion}>Ask</button>
          </div>
        </div>
      </div >
    </div >

  )
}

export default App;
