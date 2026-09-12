import React from 'react'

const RecentSearch = ({
  recentHistory,
  setRecentHistory,
  setSelectedHistory
}) => {

  const clearHistory = () => {

    localStorage.removeItem('history')

    setRecentHistory([])

  }

  return (
    <div
      className="
        col-span-1
        bg-red-100
        dark:bg-zinc-800
        pt-3
        h-screen
        overflow-hidden
      "
    >

      {/* ================= HEADER ================= */}

      <h1
        className="
          text-xl
          text-zinc-800
          dark:text-white
          flex
          justify-center
          items-center
          gap-2
        "
      >

        <span>
          Recent history
        </span>

        <button
          onClick={clearHistory}
          className="cursor-pointer"
        >

          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >

            <path
              d="
                m376-300
                104-104
                104 104
                56-56
                -104-104
                104-104
                -56-56
                -104 104
                -104-104
                -56 56
                104 104
                -104 104
                56 56
                Z
              "
            />

          </svg>

        </button>

      </h1>

      {/* ================= HISTORY ================= */}

      <ul
        className="
          text-left
          overflow-y-auto
          overflow-x-hidden
          text-sm
          mt-2
          w-full
          h-[calc(100vh-60px)]
        "
      >

        {Array.isArray(recentHistory) &&
          recentHistory.map((item, index) => (

            <li
              key={index}
              onClick={() =>
                setSelectedHistory(item)
              }
              className="
                p-2
                px-5
                truncate
                whitespace-nowrap
                text-zinc-700
                dark:text-zinc-400
                cursor-pointer
                bg-red-200
                dark:bg-zinc-800
                hover:text-zinc-800
                dark:hover:bg-zinc-700
                dark:hover:text-zinc-200
              "
            >

              {item}

            </li>

          ))}

      </ul>

    </div>
  )
}

export default RecentSearch