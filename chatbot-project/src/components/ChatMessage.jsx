import './ChatMessage.css'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // For features like tables
import RobotProfileImage from '../assets/OCBC.jpg'
// import UserProfileImage from '../assets/avpqkaq1b.webp'

export function ChatMessage({message,sender}){

    return (
        <div className={
            sender === "robot"
                ? "robot-message"
                : "user-message"
        } >
            {sender === "robot" && (

                <>
                    <img src={RobotProfileImage} alt="robot" className="chat-message-profile"/>
                    <div className="message-text">
                        {typeof message === "string" ? (
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {message}
                            </ReactMarkdown>
                        ) : (
                            message // JSX like the loading <img/>
                        )}
                    </div>
                </>
            )}

            {sender === "user" && (
                <>
                    <div className="message-text">

                        {message}
                    </div>

                    {/*<img src={UserProfileImage} alt="user" className="chat-message-profile"/>*/}
                </>
            )}
        </div>

    );
}
