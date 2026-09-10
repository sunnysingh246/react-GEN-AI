import React, { useEffect, useState } from 'react'
import { checkHeading, replaceHeading } from '../helper'

const Answers = ({ ans, index, totalResult, type }) => {

    const [heading, setHeading] = useState(false)
    const [answer, setAnswer] = useState(ans)

    useEffect(() => {
        if (checkHeading(ans)) {
            setHeading(true)
            setAnswer(replaceHeading(ans))
        }
    }, [])


    return (
        <>

            {
                index == 0 && totalResult > 1 ? <span className='pl-5 text-xl'>{answer}</span> : heading ? <span className='pt-2 block text-white text-lg'>{answer}</span >
                    : <span className={type == 'q' ? 'pl-1' : "pl - 5"}>{answer}</span>
            }

        </>
    )

}

export default Answers
