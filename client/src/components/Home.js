import "../App.css";
import { useState } from "react";
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import Navbar from "./Navbar";
import { Toaster , toast } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';


export default function Home() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('null');

    const callApi = async (tool) => {

        setResponse("Loading...");

        try {
            const res = await axios.post(`/api/ai/${tool}`, { prompt });

            const responsePaths = {
                cohereai: res => res.data?.text,
                geminiai: res => res.data?.candidates?.[0]?.content?.parts?.[0]?.text,
                deepseek: res => res.data?.choices?.[0]?.message?.content,
                mistralai: res => res.data?.choices?.[0]?.message?.content,
            };

            const getDefaultText = res => JSON.stringify(res.data, null, 2);

            const displayText = (responsePaths[tool]?.(res)) || getDefaultText(res);

            if (response !== displayText) {
                setResponse(displayText);
            }



        } catch (error) {
            setResponse("Error : " + error.message);
        }
    };

    const copyResponse = (text) => {
        navigator.clipboard.writeText(text)
        .then(()=> toast.success("Copied to clipboard!"))
        .catch(()=> toast.error("Copied to clipboard!"))
    }



    return (
        <div className="App">
            <Navbar/>
            <div className="header">
                <h1>Enter your promt in below box to use different AI tools...</h1>
                <textarea value={prompt} onChange={(e) => { setPrompt(e.target.value) }} placeholder="Enter your promt here !" />
                <div className="buttons">
                    <button onClick={() => callApi("geminiai")}>Gemin AI</button>
                    <button onClick={() => callApi("deepseek")}>Deepseek AI</button>
                    <button onClick={() => callApi("mistralai")}>Mistral AI</button>
                    <button onClick={() => callApi("cohereai")}>Cohere AI</button>
                </div>
            </div>
            <div className="response">
                <h2>Response :</h2>
                {response === "Loading..." ? (
                    <div className="loading">⏳ Loading...</div>
                ) : (
                    <pre className="markdown">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {response?.replace(/\n{2,}/g, '\n').trim()}
                        </ReactMarkdown>
                        <button className="btn-copytext" type="button" onClick={()=>{copyResponse(response)}}><FontAwesomeIcon icon={faCopy} /></button>
                    </pre>
                )}
            </div>
            <Toaster position="left" reverseOrder={false} />
        </div>
    );
}