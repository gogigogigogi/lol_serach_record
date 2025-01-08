import { useState } from 'react';
import { getPuuid } from '../../api';
import { Record } from '../Record/Record';

export const Search = () => {
  const [nickname, setNickname] = useState('');
  const [tag, setTag] = useState('KR1');
  const [userInfo, setUserInfo] = useState(null);

  const nicknameChangeHandler = (e) => {
    setNickname(e.target.value);
  };

  const tagChangeHandler = (e) => {
    setTag(e.target.value);
  };

  async function searchHandler() {
    try {
      const params = {
        nickname,
        tag,
      };
      const result = await getPuuid(params);
      setUserInfo({
        gameName: result.data.gameName,
        puuid: result.data.puuid,
        tagLine: result.data.tagLine,
      });
    } catch (err) {
      console.log('에러', err);
    }
  }
  return (
    <div className='search-container'>
      <div className='input-container'>
        <label>
          태그
          <select id='tag' value={tag} onChange={(e) => tagChangeHandler(e)}>
            <option value='KR1'>한국</option>
          </select>
        </label>
        <label>
          닉네임
          <input
            type='text'
            id='nickname'
            value={nickname}
            onChange={(e) => nicknameChangeHandler(e)}
            required
          />
        </label>
        <button onClick={searchHandler}>검색</button>
      </div>
      {userInfo && <Record userInfo={userInfo} />}
    </div>
  );
};
