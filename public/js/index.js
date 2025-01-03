async function searchHandler() {
  console.log('검색버튼 클릭');
  const nicknameValue = document.querySelector('#nickname').value;
  const tagValue = document.querySelector('#tag').value;
  console.log(nicknameValue, tagValue);
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

(async function getRotationChams() {
  try {
    const result = await axios({
      url: '/search/rotation',
      method: 'get',
    });
    console.log('받은 로테이션 정보', result.data);

    const container = document.querySelector('.rotation-chams-contatiner');
    for (let i = 0; i < result.data.length; i++) {
      // 태그 구성
      const li = document.createElement('li');
      const div = document.createElement('div');
      const img = document.createElement('img');

      // 태그 클래스 추가
      li.classList.add('rotation-chams');
      div.classList.add('rotation-chams-name');
      img.classList.add('rotation-chams-img');

      // 태그 속성 추가
      img.setAttribute(
        'src',
        `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${result.data[i].image.full}`
      );

      // 태그 값 추가
      div.innerText = result.data[i].name;

      // 태그 삽입
      li.append(img, div);
      container.append(li);
    }
  } catch (error) {
    alert('로테이션 챔피언 정보를 불러올 수 없습니다.');
  }
})();
