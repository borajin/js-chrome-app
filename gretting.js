const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const toDoForm2 = document.querySelector(".js-todoForm");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text); //url 내의 localStorage 에 변수 저장
}

function handleSubmit(event) {
  event.preventDefault(); //기본 이벤트 제거 (엔터 누르면 submit 되는 이벤트)

  const currentValue = input.value;

  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;

  toDoForm2.classList.add(SHOWING_CN);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);

  if (currentUser === null || currentUser === "") {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
