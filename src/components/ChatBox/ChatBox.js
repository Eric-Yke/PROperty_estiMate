import React, { useState } from 'react';
import './ChatBox.css';

const ChatBox = () => {
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    console.log('Send: ', message);
    setMessage('');
  };

  return (
    <div className="chatbox">
      <div className="chatbox-header">Chat</div>
      <div className="chatbox-messages">
        {/* 我们可以在这里显示消息 */}
      </div>
      <div className="chatbox-input">
        <input type="text" value={message} onChange={handleChange} />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
