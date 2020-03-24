const toDoForm = document.querySelector(".js-todoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  //선택된 btn의 부모인 li 지움
  toDoList.removeChild(li);
  //filter 는 toDos 의 모든 아이템 조회해서 return 에 있는 조건에 맞는 item return함.
  const cleanToDos = toDos.filter(toDo => {
    //선택된 li를 지웠으니 그 li는 없는 li.id를 가지고 있다. 따라서 전체 아이템 중 li.id와 일치하지 않는 아이템들만 따로 모아 새로운 배열 만듦.
    return toDo.id !== parseInt(li.id);
  });
  //toDos 를 li를 지운 cleanToDos와 교체
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  //localStorage는 모든 데이터를 string으로 저장하므로 js의 Object를 string으로 만들어주는 JSON.stringify() 함수 씀.
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintTodo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("i");
  delBtn.classList.add("fas", "fa-times");
  delBtn.addEventListener("click", deleteToDo);
  const span = document.createElement("span");
  span.innerText = text;
  const newId = toDos.length + 1;

  //새로 만든 html 요소 html 문서에 appendChild 하기
  li.appendChild(span);
  li.id = newId;
  li.appendChild(delBtn);
  toDoList.appendChild(li);

  const toDoObj = {
    text: text,
    id: newId
  };

  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();

  const currentValue = toDoInput.value;

  paintTodo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);

  if (loadedToDos !== null) {
    //LS 의 데이터는 string 이므로 Object 는 parse해줘야한다.
    const parsedToDos = JSON.parse(loadedToDos);
    //parsedToDos 각각에 대해 내부 function(각각의요소) 이 실행됨.
    parsedToDos.forEach(toDo => {
      paintTodo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
