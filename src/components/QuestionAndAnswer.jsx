import React from 'react'
import Answers from './Answers'

const QuestionAndAnswer = ({item,index}) => {
    return (
        <>
            <div key={index + Math.random()} className={item.type == 'q' ? 'flex justify-end' : 'flex'}>
                {
                    item.type == 'q' ?
                        <li key={index + Math.random()}
                            className='text-right p-2 border-8 bg-zinc-700 border-zinc-700 rounded-tl-3xl rounded-br-3xl rounded-bf-3xl w-fit gap-2'
                        ><Answers ans={item.text} totalResult={1} index={index} type={item.type} />
                        </li>
                        : item.text.map((ansItem, ansIndex) => (
                            <li key={index + Math.random()}
                                className='text-left p-10'>
                                <Answers ans={ansItem} totalResult={ansItem.length} type={item.type} index={ansIndex} />
                            </li>
                        ))
                }
            </div>
        </>
    )
}

export default QuestionAndAnswer
