/* @jsxImportSource react */
"use client";

import { useEffect, useRef, useState } from 'react';
import dynamic from "next/dynamic";

// Dynamically import the Leaflet components and FontAwesomeIcon for use in client-side only
const MyAwesomeMap = dynamic(() => import("../../../../components/map"), { ssr: false });
const FontAwesomeIcon = dynamic(() => import('@fortawesome/react-fontawesome').then((mod) => mod.FontAwesomeIcon), { ssr: false });
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

interface ChatMessage {
  user: string;
  text: string;
}

const DashboardPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (): Promise<void> => {
    if (!inputValue.trim()) return;

    const newUserMessage: ChatMessage = { user: 'You', text: inputValue };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const botResponse: ChatMessage = { user: 'Bot', text: `🤖: "${data.reply}"` };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: ChatMessage = { user: 'Bot', text: "🤖: I'm having some trouble understanding. Could you try rephrasing?" };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setInputValue('');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#121212' }}> {/* Dark background */}
      {/* Map Component */}
      <div style={{ flex: 1, padding: '10px' }}>
        <MyAwesomeMap />
      </div>

      {/* Chat Interface */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', margin: '10px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: '#161B22', border: '1px solid #30363d' }}>
        <div style={{ flexGrow: 1, overflow: 'auto', padding: '15px' }}>
          {messages.map((msg, index) => (
            <div key={index} style={{ marginBottom: '10px', padding: '10px', borderRadius: '10px', backgroundColor: msg.user === 'You' ? '#0D1117' : '#21262D', color: msg.user === 'You' ? 'white' : '#58A6FF', alignSelf: msg.user === 'You' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
              <span>{msg.text}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div style={{ borderTop: '1px solid #30363d', padding: '15px', display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            style={{ flexGrow: 1, marginRight: '10px', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: '#0D1117', color: 'white' }}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage} style={{ padding: '10px', borderRadius: '50%', backgroundColor: '#238636', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faCircleExclamation} style={{ color: 'white' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
