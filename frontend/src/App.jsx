import { Chat } from './components/Chat/Chat';
import { RotationChamp } from './components/RotationChamp/RotationChamp';
import { Search } from './components/Search/Search';
import { useEffect, useState } from 'react';
import { getCookie } from './api';
import './App.css';

function App() {
  const [cookie, setCookie] = useState('');

  useEffect(() => {
    let cookie = document.cookie?.split('=')[1];
    async function getCookieFunc() {
      try {
        await getCookie();
        cookie = document.cookie?.split('=')[1];
        setCookie(cookie);
      } catch (error) {
        console.log(error);
      }
    }

    // 쿠키가 없는 경우에만 쿠키 요청 보냄
    if (cookie) {
      setCookie(cookie);
      return;
    } else {
      getCookieFunc();
    }
  }, []);

  return (
    <div className='app-container'>
      <aside className='rotation-chams-container'>
        <RotationChamp />
      </aside>
      <main className='main-container'>
        <Search />
      </main>
      {cookie && (
        <aside className='chat-container'>
          <Chat nickname={cookie.slice(0, 7)} />
        </aside>
      )}
      {!cookie && <p>{'채팅방이 열리지 않았습니다.'}</p>}
    </div>
  );
}

export default App;
