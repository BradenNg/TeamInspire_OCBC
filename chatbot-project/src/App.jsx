import { useState} from 'react'
import { ChatbotInput } from './components/ChatInput'
import ChatMessages from './components/ChatMessages'

import './App.css'

function App(){

    const [chatMessages, setChatMessages] = useState(
        [{
            message: "Hello, I'm your OCBC Virtual Assistant.",
            sender: "robot",
            id:1
        }]);

    // current data store in the array
    // const chatMessages = array[0];
    // function to update the data
    // const setChatMessages = array[1];
    //const [chatMessages, setChatMessages] = array;

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
