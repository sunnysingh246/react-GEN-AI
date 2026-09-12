import React from 'react'
import Answers from './Answers'

const QuestionAndAnswer = ({ item, index }) => {

    return (
        <div
            className={
                item.type === 'q'
                    ? 'flex justify-end w-full'
                    : 'flex flex-col w-full'
            }
        >

            {item.type === 'q' ? (

                <li
                    className="
            text-right
            p-2
            border-8
            bg-red-100
            dark:bg-zinc-700
            border-red-100
            dark:border-zinc-700
            rounded-tl-3xl
            rounded-br-3xl
            rounded-bl-3xl
            w-fit
            max-w-[80%]
          "
                >

                    <Answers
                        ans={item.text}
                        totalResult={1}
                        index={index}
                        type={item.type}
                    />

                </li>

            ) : (

                item.text.map((ansItem, ansIndex) => (

                    <li
                        key={ansIndex}
                        className="
              text-left
              p-2
              w-full
            "
                    >

                        <Answers
                            ans={ansItem}
                            totalResult={item.text.length}
                            type={item.type}
                            index={ansIndex}
                        />

                    </li>

                ))

            )}

        </div>
    )
}

export default QuestionAndAnswer