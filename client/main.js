/* Para que funcione a nivel local
http://192.168.0.17:6677 ip del equipo*/
var socket = io.connect('http://192.168.0.17:6677', { 'forceNew': true });

socket.on('messages', function (data) {
    console.log(data);
    render(data);
});

/* Funcion que imprime en pantalla la data */
function render(data) {
    var html = data.map(function (message, index) {
        return (`
            <div class="message"> 
                <strong>${message.nickname}</strong> dice:
                <p>${message.text}</p>
            </div>
        `);
    }).join(' '); /* Espacion entre cada elemento */

   var div_msgs = document.getElementById('messages')
   div_msgs.innerHTML = html;
   div_msgs.scrollTop = div_msgs.scrollHeight; /* Para que haga foco en el ultimo mensaje */
}

function addMessage(e) {
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    }

    document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message', message);
    return false; /* Para que corte la ejecución */
}