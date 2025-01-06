import { Chat } from './components/Chat';
import { Record } from './components/Record';
import { RotationChamp } from './components/RotationChamp';
import { Search } from './components/Search';

function App() {
  return (
    <>
      <aside className='rotation-chams-container'>
        <RotationChamp />
      </aside>
      <main className='main-container'>
        <Search />
        <Record />
      </main>
      <aside className='class="chat-container"'>
        <Chat />
      </aside>
    </>
  );
}

export default App;
