import { Chat } from './components/Chat/Chat';
import { RotationChamp } from './components/RotationChamp/RotationChamp';
import { Search } from './components/Search/Search';
import './App.css';
function App() {
  return (
    <div className='app-container'>
      <aside className='rotation-chams-container'>
        <RotationChamp />
      </aside>
      <main className='main-container'>
        <Search />
      </main>
      <aside className='chat-container'>
        <Chat />
      </aside>
    </div>
  );
}

export default App;
