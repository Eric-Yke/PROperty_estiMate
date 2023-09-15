import React, { useState, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai"; // 引入用户图标
import { IoClose } from 'react-icons/io5';
import logo from '../../images/logowithouttext.PNG';


import "./ChatBox.css"; // 引入样式文件

const corpus = [
  { question: "你是谁", response: "我是机器人", showInUI: true },
  { question: "作者是谁", response: "作者是不明身份的程序员", showInUI: true },
  { question: "How to use", response: "First enter you address...", showInUI: false },
  { question: "Limit", response: "登陆可以查看更多详细内容", showInUI: false },
];

const ChatBox = () => {
  const [showAutoReply, setShowAutoReply] = useState(false);
  const [input, setInput] = useState("");
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    if (showAutoReply) {
      setChatList([
        {
          isUser: false,
          text: [
            "你好，我可以回答以下问题：",
            "\0 1. How to use",
            "\0 2. Limit",
            "\0 3. 网站详情"
          ].map((text, index) => <p key={index}>{text}</p>)
        }
      ]);
    }
  }, [showAutoReply]);

  const handleSend = () => {
    const response = corpus.find((item) => input.includes(item.question));
    setChatList([...chatList, { isUser: true, text: input }, { isUser: false, text: response ? response.response : "我不懂你在说什么" }]);
    setInput("");
  };

  const handleClose = () => {
    setShowAutoReply(false);
    setChatList([]); // 清空历史消息
  };


  return (
    <div className="chatboxCover">
      <button onClick={() => setShowAutoReply(!showAutoReply)} className="shabbtn">Chat Robort</button>
      {showAutoReply && (
        <div className="chatbox">
          <div className="chatbox-header">
            Chat Robort
            <button onClick={handleClose} className="shabbutn_pluus03">
              <IoClose size={20} />
            </button>
          </div>
          <div className="chatbox-messages">
            {chatList.map((chat, index) => (
              <div key={index} className={chat.isUser ? 'user-message' : 'chat-message'}>
                {chat.isUser
                  ? <AiOutlineUser size={30} className="user-icon" />
                  : <img src={logo} alt="logo" className="robot-logo" />
                }
                <div className="message-text">
                  {chat.text}
                </div>
              </div>
            ))}
          </div>
          <div className="chatbox-quick-questions">
            {corpus
              .filter(item => item.showInUI)
              .map((item, index) => (
                <button key={index} onClick={() => setInput(item.question)}>
                  {item.question}
                </button>
              ))}
          </div>
          <div className="chatbox-input">
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleSend} className="shabbtn_plus02">Send</button>
          </div>

        </div>
      )}
    </div>
  );
};

export default ChatBox;