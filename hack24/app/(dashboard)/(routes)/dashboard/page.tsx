"use client";

import { useEffect, useRef, useState } from 'react';

const DashboardPage = () => {
    const [messages, setMessages] = useState<Array<{ user: string, text: string }>>([]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);  // Explicitly typing the ref

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const sendMessage = () => {
        if (!inputValue.trim()) return;

        const newUserMessage = { user: 'You', text: inputValue };
        const botResponse = { user: 'Bot', text: `🤖: "I received: ${inputValue}"` };

        setMessages([...messages, newUserMessage, botResponse]);
        setInputValue('');
    };

    return (
        <div className="flex h-screen bg-[#0D1117] text-white font-inter p-10">
            <div className="flex-1"></div>
            <div className="w-5/12 mt-10 mr-2 mb-10 flex flex-col rounded-3xl overflow-hidden shadow-xl bg-[#161B22] border border-[#30363d]">
                <div className="flex-grow overflow-auto p-6 space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`p-4 text-sm rounded-lg shadow transition-all ${msg.user === 'You' ? 'ml-auto bg-[#0D1117] border border-[#30363d]' : 'mr-auto bg-[#21262D] text-[#58A6FF]'}`}>
                            {msg.user === 'Bot' ? <span>{msg.text}</span> : null}
                            {msg.user === 'You' ? <strong>{msg.user}:</strong> : null} <span className={`${msg.user === 'You' ? 'ml-2' : ''}`}>{msg.text}</span>
                        </div>
                    ))}
                    {/* Ensuring this div is the target for scrolling */}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-6 bg-[#0D1117] border-t border-[#30363d]">
                    <div className="flex space-x-3">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="flex-grow p-3 rounded-full bg-[#161B22] border-transparent focus:border-transparent focus:ring-0 transition-all placeholder-gray-400"
                            placeholder="Type a message..."
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <button onClick={sendMessage} className="p-3 rounded-full bg-[#238636] hover:bg-[#2EA043] focus:outline-none transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 2.25l-10.5 19.5-3.75-8.25-8.25-3.75 19.5-10.5z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
