const ChatMessage = ({ message, isAlert }) => {
    return (
        <div className="chat-message-div">
            {isAlert ? <p className="alert-message">{message}</p> : <p className="regular-message">{message}</p>}
        </div>
    );
};

export default ChatMessage;
