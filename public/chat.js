const socket = io();

// DOM elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

function enviarMensaje() {
    if (username.value == 0) {
        alert("Debes ingresar usuario para enviar");
    }else if(message.value == 0) {
        alert("Debes ingresar texto para enviar");
    }else {
        socket.emit('chat:message', {
            username: username.value,
            message: message.value,
        });
    }
   message.value = "";
};

btn.addEventListener('click', () => {
    enviarMensaje();
});

message.onkeyup = function(e){
    e = e || event;
    if (e.keyCode === 13) {
        enviarMensaje();
    }else if (p.keyCode === 127 && message.value == 0) {
        actions.innerHTML = '';
    }
    return true;
}


message.addEventListener('keypress', () => {
    socket.emit('chat:typing', username.value);
});

socket.on('chat:message', (data) => {
    actions.innerHTML = '';
    output.innerHTML +=  `<p> 
    <strong>${data.username}</strong>: ${data.message}
    </p>`
});

socket.on('chat:typing', (data) => {
    actions.innerHTML = `<p><em>${data} is typing a message.</em></p>`
});

