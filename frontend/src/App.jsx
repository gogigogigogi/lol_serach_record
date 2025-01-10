import { Chat } from './components/Chat/Chat';
import { RotationChamp } from './components/RotationChamp/RotationChamp';
import { Search } from './components/Search/Search';
import { useEffect, useState } from 'react';
import './App.css';
import { getCookie } from './api';

function App() {
  const [cookie, setCookie] = useState('');
  const setCookieHandler = (cookie) => {
    setCookie(cookie);
  };

  useEffect(() => {
    async function getCookieFunc() {
      try {
        await getCookie();
        const cookie = document.cookie?.split('=')[1];
        setCookie(cookie);
      } catch (error) {
        console.log(error);
      }
    }
    getCookieFunc();
  }, []);

  return (
    <div className='app-container'>
      <aside className='rotation-chams-container'>
        <RotationChamp setCookieHandler={setCookieHandler} />
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
