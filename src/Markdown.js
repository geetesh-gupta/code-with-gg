import React, {useEffect, useState} from 'react';
import ReactMarkdown from "react-markdown";
import {renderToString} from 'react-dom/server'
import Highlight from "react-highlight";

const Markdown = ({file}) => {
    const [data, setData] = useState('');
    useEffect(() => {
        fetch(file)
            .then(response => {
                return response.text()
            })
            .then(text => {
                setData(text)
            })
    }, [file]);
    return (
        <Highlight innerHTML={true}>
            {renderToString(
                <ReactMarkdown
                    source={data}
                    className="code-markdown"
                    sourcePos
                    includeNodeIndex
                    linkTarget="_blank"/>
            )}
        </Highlight>
    )
};

export default Markdown;
