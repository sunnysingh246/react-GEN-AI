import React, { useEffect, useState } from 'react'
import { checkHeading, replaceHeading } from '../helper'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import ReactMarkdown from 'react-markdown'

const Answers = ({ ans, index, totalResult, type }) => {

    const [heading, setHeading] = useState(false)
    const [answer, setAnswer] = useState(ans)

    useEffect(() => {

        if (checkHeading(ans)) {
            setHeading(true)
            setAnswer(replaceHeading(ans))
        }

    }, [ans])

    const renderer = {

        code({
            node,
            inline,
            className,
            children,
            ...props
        }) {

            const match =
                /language-(\w+)/.exec(className || '')

            return !inline && match ? (

                <SyntaxHighlighter
                    {...props}
                    language={match[1]}
                    style={dark}
                    PreTag="div"
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>

            ) : (

                <code
                    {...props}
                    className={className}
                >
                    {children}
                </code>

            )
        }
    }

    return (
        <>
            {index === 0 && totalResult > 1 ? (

                <span className="pl-5 text-xl">
                    {answer}
                </span>

            ) : heading ? (

                <span className="pt-2 block text-white text-lg">
                    {answer}
                </span>

            ) : (

                <span
                    className={
                        type === 'q'
                            ? 'pl-1'
                            : 'pl-5'
                    }
                >

                    <ReactMarkdown components={renderer}>
                        {answer}
                    </ReactMarkdown>

                </span>

            )}
        </>
    )
}

export default Answers