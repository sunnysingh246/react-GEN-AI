import React, { useEffect, useState } from 'react'
import { checkHeading, replaceHeading } from '../helper'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import reactMarkdown from 'react-markdown'

const Answers = ({ ans, index, totalResult, type }) => {

    const [heading, setHeading] = useState(false)
    const [answer, setAnswer] = useState(ans)

    useEffect(() => {
        if (checkHeading(ans)) {
            setHeading(true)
            setAnswer(replaceHeading(ans))
        }
    }, [])

    const renderer = {
        code({ node, inLine, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inLine && match ? (
                <SyntaxHighlighter
                    {...props}
                    children={string(children).replace(/\n$/, '')}
                    language={match[1]}
                    style={dark}
                    PreTag="div"
                />
            ) : (
                <code {...props} className={className}>
                    {children}
                </code>
            )
        }
    }


    return (
        <>

            {
                index == 0 && totalResult > 1 ? <span className='pl-5 text-xl'>{answer}</span> : heading ? <span className='pt-2 block text-white text-lg'>{answer}</span >
                    : <span className={type == 'q' ? 'pl-1' : "pl - 5"}>
                        <reactMarkdown components={renderer}>{answer}</reactMarkdown>
                    </span>
            }

        </>
    )

}

export default Answers
