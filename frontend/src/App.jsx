import { Chat } from './components/Chat/Chat';
import { RotationChamp } from './components/RotationChamp/RotationChamp';
import { Search } from './components/Search/Search';
import './App.css';
import { useState } from 'react';
function App() {
  const [cookie, setCookie] = useState();
  const nickname = document.cookie?.split('=')[1].slice(0, 7);
  const setCookieHandler = (cookie) => {
    setCookie(cookie);
  };

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
          <Chat nickname={nickname} />
        </aside>
      )}
    </div>
  );
}

export default App;
