import { useEffect, useState } from 'react';
import { getRotationChamp } from '../../api';

export const RotationChamp = () => {
  const [rotationChampList, setRotationChampList] = useState([]);

  async function renderRotationChams() {
    try {
      const result = await getRotationChamp();
      console.log(result);
      setRotationChampList(result.data);
    } catch (error) {
      console.log('에러는 ', error);
      alert('로테이션 챔피언 정보를 불러올 수 없습니다.');
    }
  }
  useEffect(() => {
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
                src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${rotationChampList[idx].image.full}`}
              ></img>
              <div className='rotation-chams-name'>
                {rotationChampList[idx].name}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
