const socket = io();

const welcome = document.querySelector("#welcome");
const formRoom = welcome.querySelector("#formRoom");
const room = document.querySelector("#room");
const formMessage = room.querySelector("#message");
const formNickname = welcome.querySelector("#nickname");

room.hidden = true;

let roomName = "";
let nickName = "";

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);

}

function handleRoomSubmit(event){
  event.preventDefault();
  const input = formRoom.querySelector("input");
  socket.emit("enter_room", input.value, nickName, showRoom);
  roomName = input.value;
  input.value = "";
}

function handleNicknameSubmit(event){
  event.preventDefault();
  const input = formNickname.querySelector("input");
  const value = input.value;
  nickName = value;
  socket.emit("nickname", value);
  input.value = "";
  //append the nickname
  const p = welcome.querySelector("#currentNickname");
  p.innerText = `Your nickname : ${value}`;
}

function handleMessageSubmit(event){
  event.preventDefault();
  const input = formMessage.querySelector("input");
  const value = input.value;
  socket.emit("new_message", value, roomName, () => {
    addMessage(`You: ${value}`);
  })
  input.value = "";
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  formMessage.addEventListener("submit", handleMessageSubmit);
  
  }

formRoom.addEventListener("submit", handleRoomSubmit);
formNickname.addEventListener("submit", handleNicknameSubmit);


socket.on("welcome", (user) => {
  addMessage(`${user} joined!`);
});

socket.on("bye", (leftNickname) => {
  addMessage(`${leftNickname} left`);
});

socket.on("new_message", addMessage);
