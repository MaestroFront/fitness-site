import React, { useState } from "react";
import "./styles/ChatBot.css";

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isChatOpen, setIsChatOpen] = useState(false);

    const handleSendMessage = () => {
        if (input.trim() === "") return;

        const newMessages = [
            ...messages,
            { sender: "user", text: input },
            { sender: "bot", text: "Все операторы пока заняты..." },
        ];
        setMessages(newMessages);
        setInput("");
    };

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
        console.log("Chat open state:", !isChatOpen);
    };

    return (
        <>
            <div className={`chat-container ${isChatOpen ? "open" : ""}`}>
                <div className="chat-box">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`message ${message.sender}`}
                        >
                            {message.text}
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Задайте ваш вопрос..."
                    />
                    <button onClick={handleSendMessage}>Отправить</button>
                </div>
            </div>
            <div
                className={`chat-toggle ${isChatOpen ? "open" : ""}`}
                onClick={toggleChat}
            ></div>
        </>
    );
};

export default ChatBot;
