import { useState} from 'react'
import { ChatbotInput } from './components/ChatInput'
import ChatMessages from './components/ChatMessages'

import './App.css'

function App(){

    const [chatMessages, setChatMessages] = useState(() => {
        const savedMessages = localStorage.getItem("chatMessages");

        return savedMessages ? JSON.parse(savedMessages) :
            [{
                message: "Hello, I'm your OCBC Virtual Assistant.",
                sender: "robot",
                id: 1
            }]
    });

    return (
        <div className="app-container">

            <ChatMessages
                chatMessages={chatMessages}
            />
            <ChatbotInput
                chatMessages={chatMessages}
                setChatMessages={setChatMessages}
            />
        </div>
    );
}

export default App
