import React, { useState, useEffect, useRef } from 'react';
import { SendHorizontal } from 'lucide-react';

const OnGoingChat = () => {
  const [messages, setMessages] = useState([
    { question: 'What is the project deadline?', answer: 'The deadline is next Friday.' },
    { question: 'Can we extend the deadline?', answer: 'We can discuss it with the team.' },
    { question: 'Hello bhai', answer: 'hello my boy how are you?' },
    { question: 'bhai placement nahi hori', answer: 'ahh shit koi nahi.' },
    { question: 'sojata hu', answer: 'best, Good night bro.' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  
  // Create refs for the messages container and input field
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to the bottom whenever messages are updated
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Set focus to input when the component is mounted or clicked anywhere in the tab
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { question: newMessage, answer: 'Pending response...' }]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && newMessage.trim()) {
      handleSendMessage();
    }
  };

  return (
    <div className="p-4 h-[50vh] flex flex-col relative">
      {/* Chat messages */}
      <div className="flex-grow overflow-y-auto mb-12">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>Q:</strong> {msg.question}
            <br />
            <strong>A:</strong> {msg.answer}
          </div>
        ))}

        {/* This div helps to scroll to the bottom */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input and Send button */}
      <div className="flex absolute bottom-0 w-full bg-white p-2 border-t">
        <label htmlFor="message" className="sr-only">Type your question...</label>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress} // Handle Enter key
          ref={inputRef} // Reference to the input field
          className="border p-2 flex-grow"
          placeholder="Type your question..."
        />
        <button onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-700 w-25 text-white p-2 ml-2 rounded-3xl">
          <SendHorizontal size={34} />
        </button>
      </div>
    </div>
  );
};

export default OnGoingChat;
