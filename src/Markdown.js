import React, {useEffect, useState} from 'react';
import ReactMarkdown from "react-markdown";

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
    return <ReactMarkdown source={data}/>
};

export default Markdown;
