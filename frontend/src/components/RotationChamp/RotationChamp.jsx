import { useEffect, useState } from 'react';
import { getRotationChamp } from '../../api';

export const RotationChamp = () => {
  const [rotationChampList, setRotationChampList] = useState([]);

  useEffect(() => {
    async function renderRotationChams() {
      try {
        const result = await getRotationChamp();
        setRotationChampList(result.data);
      } catch (error) {
        console.log('에러는 ', error);
        alert('로테이션 챔피언 정보를 불러올 수 없습니다.');
      }
    }
    renderRotationChams();
  }, []);

  return (
    <div>
      <div>로테이션 챔피언</div>
      <ul>
        {rotationChampList.map((champion, idx) => {
          return (
            <li className='rotation-chams' key={idx}>
              <img
                className='rotation-chams-img'
                src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${champion.image.full}`}
              ></img>
              <div className='rotation-chams-name'>{champion.name}</div>
            </li>
          );
        })}
      </ul>
      {rotationChampList.length === 0 && '로테이션 목록을 불러올수없습니다.'}
    </div>
  );
};
