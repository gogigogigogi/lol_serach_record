import { useState } from 'react';
import { getUserRecord } from '../../api';
import { Record } from '../Record/Record';

export const Search = () => {
  const [searchInput, setSearchInput] = useState({
    nickname: '',
    tag: 'KR1',
  });
  const [records, setRecords] = useState({});

  const onChangeHandler = (e, type) => {
    setSearchInput((prevState) => {
      return {
        ...prevState,
        [type]: e.target.value,
      };
    });
  };

  async function searchHandler(e) {
    try {
      e.preventDefault();

      const params = {
        nickname: searchInput.nickname,
        tag: searchInput.tag,
      };

      const result = await getUserRecord(params);
      setRecords(result.data);
      setSearchInput({ nickname: '', tag: 'KR1' });
    } catch (err) {
      console.log('에러', err);
    }
  }
  return (
    <div className='search-container'>
      <form className='input-container'>
        <label>
          태그
          <select id='tag-select' onChange={(e) => onChangeHandler(e, 'tag')}>
            <option value='KR1' selected>
              한국
            </option>
            <option value='JP1'>일본</option>
            <option value='NA1'>미국</option>
          </select>
        </label>

        <input
          type='text'
          id='tag'
          value={searchInput.tag}
          onChange={(e) => onChangeHandler(e, 'tag')}
          required
          style={{
            width: '50px',
          }}
        />

        <label>
          닉네임
          <input
            type='text'
            id='nickname'
            value={searchInput.nickname}
            onChange={(e) => onChangeHandler(e, 'nickname')}
            required
          />
        </label>
        <button onClick={searchHandler}>검색</button>
      </form>
      {Object.keys(records).length > 0 && <Record records={records} />}
    </div>
  );
};
