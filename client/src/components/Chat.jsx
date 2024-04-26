import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import ChatMessage from "./ChatMessage";

const Chat = ({ sendJsonMessage, lastJsonMessage }) => {
    const messagesEndRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");

    useEffect(() => {
        if (!lastJsonMessage) {
            return;
        }

        let isAlert = true;
        let message = "";

        if (lastJsonMessage.messageType === "chatMessage") {
            isAlert = false;
            message = `${lastJsonMessage.username}: ${lastJsonMessage.chatMessage}`;

        } else if (lastJsonMessage.messageType === "connect") {
            message = `${lastJsonMessage.username} has joined the room`;

        } else if (lastJsonMessage.messageType === "disconnect") {
            message = `${lastJsonMessage.username} has left the room`;

        } else if (lastJsonMessage.messageTypeDetailed === "seek") {
            message = `${lastJsonMessage.username} has seeked the video`;

        } else if (lastJsonMessage.messageTypeDetailed === "play") {
            message = `${lastJsonMessage.username} has played the video`;

        } else if (lastJsonMessage.messageTypeDetailed === "pause") {
            message = `${lastJsonMessage.username} has paused the video`;

        } else if (lastJsonMessage.messageTypeDetailed === "videoChange") {
            message = `${lastJsonMessage.username} has changed the video`;

        } else {
            message = `${lastJsonMessage.username} has caused an event`;
        }

        setMessages([...messages, { id: uuidv4(), message, isAlert }]);
    }, [lastJsonMessage]);

    useEffect(() => {
        if (messagesEndRef.current !== null) {
            messagesEndRef.current.scrollIntoView({ bahavior: "smooth" });
        }
    }, [messages]);

    const handleMessageSend = () => {
        sendJsonMessage({
            messageType: "chatMessage",
            chatMessage: messageInput
        });
        setMessageInput("");
    };

    return (
        <div className="chat-div">
            <div className="chat-box">
                {messages.map(message => <ChatMessage key={message.id} message={message.message} isAlert={message.isAlert} />)}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={(e) => {
                e.preventDefault();
                handleMessageSend();
            }}>
                <input type="text" className="chat-message-input" value={messageInput} placeholder="Type messages here"
                    onChange={(e) => setMessageInput(e.target.value)}></input>
            </form>
        </div>
    );
};

export default Chat;