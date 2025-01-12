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
          const gameCreationTime = new Date(
            record?.gameCreation
          ).toLocaleString('ko-KR');

          const gameDurationTime = (record?.gameDuration / 60)
            .toFixed(2)
            .split('.');

          return (
            <li
              key={idx}
              className={`record-list ${record?.win ? 'win' : 'lose'}`}
            >
              <p>{record?.gameType}</p>
              <p className='record-champion'>챔피언 : {record?.champion}</p>
              <p className='record-position'> 포지션 : {record?.position}</p>
              <p>게임 생성일 : {gameCreationTime}</p>
              <p>
                게임 시간 : {gameDurationTime[0]}분 {gameDurationTime[1]}초
              </p>
              <p className='record-kda'>승/패 : {record?.win ? '승' : '패'}</p>
              <p>
                KDA : ({record?.kda}) {record?.kills} / {record?.deaths} /{' '}
                {record?.assists}
              </p>
              <div>
                <img
                  src={record?.champion_img}
                  alt='champion_img'
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'pink',
                  }}
                />
              </div>
              <ul className='item-list-box'>
                {record?.items.map((item) => {
                  return (
                    <li className='item-list' key={item}>
                      {item > 0 ? (
                        <img
                          src={`https://ddragon.leagueoflegends.com/cdn/15.1.1/img/item/${item}.png`}
                          alt='item_img'
                          style={{
                            width: '30px',
                            height: '30px',
                            backgroundColor: 'pink',
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '30px',
                            height: '30px',
                            backgroundColor: 'pink',
                          }}
                        ></div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
