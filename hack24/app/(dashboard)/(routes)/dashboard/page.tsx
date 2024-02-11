"use client";
import { useState } from 'react';

const DashboardPage = () => {
    const [messages, setMessages] = useState<Array<{ user: string, text: string }>>([]);
    const [inputValue, setInputValue] = useState('');

    const sendMessage = () => {
        if (!inputValue.trim()) return;

        const newUserMessage = { user: 'You', text: inputValue };
        const botResponse = { user: 'Bot', text: `You said: "${inputValue}"` };

        setMessages([...messages, newUserMessage, botResponse]);
        setInputValue('');
    };

    return (
        <div className="flex h-screen bg-[#121212] text-gray-300 font-inter">
            <div className="w-1/2 flex flex-col rounded-r-3xl overflow-hidden shadow-lg">
                <div className="flex-grow overflow-auto p-4 bg-[#1E1E1E]">
                    {messages.map((msg, index) => (
                        <div key={index} className={`p-3 my-2 text-sm rounded-md shadow transition-all ${msg.user === 'You' ? 'ml-auto bg-[#252525]' : 'mr-auto bg-[#1E1E1E]'}`}>
                            <strong>{msg.user}:</strong> <span className="ml-2">{msg.text}</span>
                        </div>
                    ))}
                </div>
                <div className="p-4 bg-[#252525]">
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="flex-grow p-2 rounded-full bg-[#1E1E1E] border-transparent focus:border-transparent focus:ring-0 transition-all"
                            placeholder="Type a message..."
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <button onClick={sendMessage} className="p-2 rounded-full bg-[#4A148C] hover:bg-[#6A1B9A] focus:outline-none transition-all">Send</button>
                    </div>
                </div>
            </div>
            <div className="w-1/2 flex items-center justify-center bg-[#121212] rounded-l-3xl">
                <p className="text-lg font-semibold">Your Interactive Chatbot</p>
            </div>
        </div>
    );
}

export default DashboardPage;
