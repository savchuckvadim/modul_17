const wsUri = "wss://echo.websocket.org/";
var socket = new WebSocket(wsUri);

function pageLoaded() {
  const infoOutput = document.querySelector(".info_output");
  const chatOutput = document.querySelector(".chat_output");
  const input = document.querySelector("input");
  const sendBtn = document.querySelector(".btn_send");
  
  
  
  socket.onopen = () => {
    infoOutput.innerText = "Соединение установлено";
  }
  
  socket.onmessage = (event) => {
    writeToChat(event.data, true);
  }
  
  socket.onerror = () => {
    infoOutput.innerText = "При передаче данных произошла ошибка";
  }
  
  sendBtn.addEventListener("click", sendMessage);
  
  function sendMessage() {
    if (!input.value) return;
    socket.send(input.value);
    writeToChat(input.value, false);
    input.value === "";
    input.value = "";
    
  }
  
  function writeToChat(message, isRecieved) {
    let messageHTML = `<div class="${isRecieved? "recieved" : "sent"}">${message}</div>`;
    chatOutput.innerHTML += messageHTML;
    
  }
}

document.addEventListener("DOMContentLoaded", pageLoaded);

//Геолокация


function pageLoadedGeo() {
  const btn = document.getElementById("btn_geo");
  const output = document.getElementById("output");
  
  btn.addEventListener("click", getLocation);
  
  function getLocation() {
    if ("geolocation" in navigator) {
      let locationOptions = {
        enableHighAccuracy: true
      };
      navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);
      
    } else {
      socket.send("Ваш браузер не поддерживает функцию определения местоположения");
    }
  }
  
  function locationSuccess(data) {
    let link = `https://www.openstreetmap.org/#map=10/${data.coords.longitude}/${data.coords.latitude}`;
    socket.send(`<a href="${link}" target="_blank">Вы находитесь здесь</a>`);
  }
  
  function locationError() {
    socket.send("При получении местоположения произошла ошибка");
  }
  
  
}

document.addEventListener("DOMContentLoaded", pageLoadedGeo);