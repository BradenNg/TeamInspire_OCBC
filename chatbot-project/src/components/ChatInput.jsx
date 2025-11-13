import { useState} from 'react'
import './ChatInput.css'
import loadingSpinner from '../assets/loading-spinner.gif'
import sendMessageIcon from '../assets/send_1.svg'

// import {chatbot} from "supersimpledev";

export function ChatbotInput ({ chatMessages, setChatMessages}){

    const [inputText, setInputText] = useState();
    const [isLoading, setIsLoading] = useState(false);


    function saveInputText(event){
        setInputText(event.target.value);
    }

    async function sendMessage() {

        if(inputText === "" || isLoading){
            return;
        }

        setIsLoading(true);
        setInputText("");
        const newChatMessages = [...chatMessages, {
            message: inputText,
            sender: "user",
            id: crypto.randomUUID()
        }];
        setChatMessages(newChatMessages)

        setChatMessages([...newChatMessages,
            // This creates a temporary Loading... message.
            // Because we don't save this message in newChatMessages,
            // it will be remove later, when we add the response.
            {
                message: <img src={loadingSpinner} alt="robot" className="chat-message-loading"/>,
                sender: 'robot',
                id: crypto.randomUUID()
            }
        ]);

        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: inputText })
        });

        const data = await res.json();

        setChatMessages([...newChatMessages, {
            message: data.reply,
            sender: "robot",
            id: crypto.randomUUID()
        }])
        setIsLoading(false);
    }

    function handleKeyDown(event){
        if(event.key === "Enter"){
            sendMessage();
        }
        else if(event.key === "Escape"){
            setInputText("");
        }
    }

    return (
        <div className="chat-input-container">
            <input
                type="text"
                placeholder="Send a message to chatbot"
                size="50"
                onChange={saveInputText}
                onKeyDown={handleKeyDown}
                value={inputText}
                disabled={isLoading}
                className="chat-input"
            />
            <button
                className="send-button" onClick={sendMessage}
            >
                <img src={sendMessageIcon} alt="" />


            </button>
        </div>
    );
}