import { useEffect, useRef, useState } from 'react';

export const Chat = ({ nickname }) => {
  const wsRef = useRef(null);
  const [input, setInput] = useState('');
  const [msgList, setMsgList] = useState([]);

  const onChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const addChatHandler = (e) => {
    if (e.type === 'keydown' && e.key !== 'Enter') {
      return;
    }

    const input = document.querySelector('.message-input');

    if (input.value.trim().length === 0) {
      alert('내용을 입력해주세요.');
      return;
    }
    wsRef.current.send(
      JSON.stringify({
        data: input.value,
        author: { nickname: nickname },
      })
    );
    setInput('');
  };

  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_BACKEND_WS_URL);
    ws.onopen = (event) => {
      console.log('웹소켓 연결 완료', event);
    };

    ws.onmessage = (event) => {
      console.log('웹소켓 수신', JSON.parse(event.data));
      setMsgList((prevVal) => {
        return [...prevVal, JSON.parse(event.data)];
      });
    };

    ws.onclose = (event) => {
      console.log('웹소켓 연결 종료', event);
    };

    ws.onerror = (event) => {
      console.log('웹소켓 연결 에러', event);
    };

    wsRef.current = ws;
  }, []);
  return (
    <>
      채팅방
      <div className='message-container'>
        <ul>
          {msgList.map((msg, idx) => {
            return (
              <li
                key={idx}
                className={
                  msg.author.sender === 'own' ? 'own-message' : 'other-message'
                }
              >
                {msg.author.sender === 'admin' ? (
                  <span>관리자{msg.author.nickname}: </span>
                ) : (
                  <span>유저{msg.author.nickname}: </span>
                )}
                <p>{msg.data}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className='chat-input-container'>
        <input
          type='text'
          className='message-input'
          placeholder='채팅 내용을 입력해주세요.'
          value={input}
          onChange={(e) => onChangeHandler(e)}
          onKeyDown={(e) => addChatHandler(e)}
        />
        <button className='send-button' onClick={(e) => addChatHandler(e)}>
          전송
        </button>
      </div>
    </>
  );
};
