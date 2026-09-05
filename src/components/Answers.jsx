import React, { useEffect, useState } from 'react'
import { checkHeading, replaceHeading } from '../helper'

const Answers = ({ ans }) => {

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
            {heading ? <span className='pt-2 block text-lg'>{answer}</span>
                : <span className='pl-5 text-sm'>{answer}</span>}
        </>
    )

}

export default Answers
