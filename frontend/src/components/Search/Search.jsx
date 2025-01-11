import { useState } from 'react';
import { getUserRecord } from '../../api';
import { Record } from '../Record/Record';

export const Search = () => {
  const [nickname, setNickname] = useState('');
  const [tag, setTag] = useState('KR1');
  const [records, setRecords] = useState({});
  console.log(records);
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
      const result = await getUserRecord(params);
      setRecords(result.data);
      console.log('결과는', result);
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
      {Object.keys(records).length > 0 && <Record records={records} />}
    </div>
  );
};
