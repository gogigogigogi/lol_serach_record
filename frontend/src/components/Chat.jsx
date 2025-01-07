import { useEffect, useRef, useState } from 'react';

export const Chat = () => {
  const wsRef = useRef(null);
  const [msgList, setMsgList] = useState([]);
  console.log(msgList);

  function addChatHandler() {
    const input = document.querySelector('.message-input');
    if (input.value.trim().length === 0) {
      alert('내용을 입력해주세요.');
      return;
    }
    console.log('전송할 값은', input.value);
    wsRef.current.send(JSON.stringify({ data: input.value }));
  }

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
    <div>
      <div className='message-container'>
        <ul>
          {msgList.map((msg, idx) => {
            return (
              <li key={idx}>
                <p>{msg.data}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className='input-container'>
        <input
          type='text'
          className='message-input'
          placeholder='채팅 내용을 입력해주세요.'
        />
        <button className='send-button' onClick={addChatHandler}>
          전송
        </button>
      </div>
    </div>
  );
};
