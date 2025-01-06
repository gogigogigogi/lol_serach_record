import { useState } from 'react';
import axios from 'axios';

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
      const result = await axios({
        url: 'http://localhost:8080/search',
        method: 'get',
        withCredentials: true,
        params: {
          nickname: nickname,
          tag: tag,
        },
      });
      const { gameName, puuid, tagLine } = result.data;
      console.log(result);
      setUserInfo({ gameName, puuid, tagLine });
    } catch (err) {
      console.log('에러', err);
    }
  }

  return (
    <div>
      <label>
        닉네임 태그
        <select id='tag' value={tag} onChange={(e) => tagChangeHandler(e)}>
          <option value='KR1'>한국</option>
        </select>
      </label>
      <label>
        <input
          type='text'
          id='nickname'
          value={nickname}
          onChange={(e) => nicknameChangeHandler(e)}
          required
        />
      </label>
      <button onClick={searchHandler}>검색</button>
      {userInfo && (
        <div>
          닉네임은<h2>{userInfo.gameName}</h2>
          puuid는<p>{userInfo.puuid}</p>
          태그명은<p>{userInfo.tagLine}</p>
        </div>
      )}
    </div>
  );
};
