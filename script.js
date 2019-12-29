const socket = io("http://localhost:3000");

const messageInput = document.getElementById("message-input");
const messageForm = document.getElementById("send-container");
const messageContainer = document.getElementById("message-container");
const feedback = document.getElementById("feedback");
const name = prompt("type your name");
appendMessage("You Joined");
socket.emit("new-user", name);

socket.on("chat-message", data => {
  appendMessage(`${name} : ${data.message}`);
});

socket.on("user-connected", name => {
  appendMessage(`${name} connected`);
});

socket.on("user-disconnected", name => {
  appendMessage(`${name} disconnected`);
});

messageForm.addEventListener("submit", e => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

messageForm.addEventListener("keypress", function() {
  socket.emit("typing", name);
});

socket.on("typing", function(d) {
  feedback.innerHTML = `<p><em> ${d} is typing a message </em></p>`;
});
function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
