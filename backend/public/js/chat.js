const ws = new WebSocket('ws://localhost:8080');
const browserInfo = navigator.userAgent; // 브라우저 정보

ws.onopen = (event) => {
  console.log('서버와 연결 완료', event);
};
ws.onmessage = (event) => {
  console.log('from 서버 to 클라 메세지', event);
  const messageContainer = document.querySelector('.message-container');
  const li = document.createElement('li');
  const content = document.createElement('p');

  content.innerText = event.data;

  li.append(content);
  messageContainer.append(li);
};

ws.onerror = (event) => {
  console.log('에러발생', event);
};

function addChatHandler() {
  const input = document.querySelector('.message-input');
  if (input.value.trim().length === 0) {
    alert('내용을 입력해주세요.');
    return;
  }
  console.log('전송할 값은', input.value);
  ws.send(input.value);
}
