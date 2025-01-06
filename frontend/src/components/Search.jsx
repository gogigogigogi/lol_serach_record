import { useState } from 'react';

export const Search = () => {
  const [nickname, setNickname] = useState('');
  const [tag, setTag] = useState('KR1');

  console.log(nickname, tag);

  const nicknameChangeHandler = (e) => {
    setNickname(e.target.value);
  };

  const tagChangeHandler = (e) => {
    setTag(e.target.value);
  };

  async function searchHandler() {
    console.log('검색버튼 클릭');
    try {
      const result = await axios({
        url: '/search',
        method: 'get',
        params: {
          nickname: nicknameValue,
          tag: tagValue,
        },
      });
      console.log(result);
    } catch (err) {}
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
    </div>
  );
};
