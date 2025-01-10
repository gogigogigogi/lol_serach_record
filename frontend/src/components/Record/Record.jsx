export const Record = ({ records }) => {
  console.log('records는', records);
  return (
    <div className='record-container'>
      <div className='userinfo-box'>
        <div className='userinfo-nickname'>
          닉네임 : {records.userInfo.riotIdGameName}
        </div>
        <div className='userinfo-tag'>
          태그 : {records.userInfo.riotIdTagline}
        </div>
        <div className='userinfo-level'>
          레벨 : {records.userInfo.summonerLevel}
        </div>
      </div>

      <ul className='record-box'>
        {records.matchInfoList.map((record, idx) => {
          return (
            <li key={idx} className='record-list'>
              챔피언 : <p className='record-champion'>{record?.champion}</p>
              포지션 : <p className='record-position'>{record?.position}</p>
              KDA : <p className='record-kda'>{record?.win ? '승' : '패'}</p>
              <p>
                {record?.kills} / {record?.deaths} / {record?.assists}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
