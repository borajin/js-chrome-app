const clockContainer = document.querySelector(".js-clock"); //document(html문서)의 자식 태그 검색
const clockTitle = clockContainer.querySelector("h1"); //clockContainer의 자식 태그 검색

function addZero(time) {
    return `${time < 10 ? `0${time}` : time}`;
}

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();

  clockTitle.innerText = `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
}

function init() {
  //현재 시간 얻기
  getTime();
  setInterval(getTime, 1000); //1초마다 getTime 호출
}

init();
