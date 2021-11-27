const chatForm = document.querySelector('#chatform');
const socket = io.connect('http://localhost:4000');

chatForm.addEventListener('submit', function() {
    const msgText = document.querySelector('#input_box');
    
    if (msgText.value == '') {
        return;
    } else {
        const msgLine = document.createElement('div');
        const msgBox = document.createElement('div');

        msgLine.classList.add('msgLine');
        msgBox.classList.add('me');

        socket.emit('send', msgText.value);

        msgBox.append(msgText.value);
        // msgBox.style.display = 'inline-block';
        // msgLine.style.textAlign = 'right';
        msgLine.append(msgBox);

        document.querySelector('#msg').append(msgLine);
        msgText.value = '';
        // chatView.scrollTop = chatView.scrollHeight;
    }
});
  
socket.on('send', function(msg) {
    const msgLine = document.createElement('div')
    const msgBox = document.createElement('div');

    msgLine.classList.add('msgLine');
    msgBox.classList.add('msgBox');

    msgBox.append(msg);
    msgBox.style.display = 'inline-block';

    msgLine.append(msgBox);
    document.querySelector('#msg').append(msgLine);

    // chatView.scrollTop = chatView.scrollHeight;
});