let sock, cookie;

const save = (ck) => {
    console.log(ck);
    cookie = ck;
};

// const getMove (this.arrow.length, this.arrow.rotation ) => {
//     const { this.arrow.length, this.arrow.rotation }
// }

const log = (text) => {
    const parent = document.querySelector('#events');
    const el = document.createElement('li');
    el.innerHTML = text;

    parent.appendChild(el);
    parent.scrollTop = parent.scrollHeight;
};


const onChatSubmitted = (sock) => (e) => {
    e.preventDefault();

    const input = document.querySelector('#chat');
    const text = input.value;
    input.value = '';

    sock.emit('message', text);
};

const move = (id, length, power) => {
    balls[id].shoot(power, rotation);
};

function onSendMove(id, length, rot){
    sock.emit('playerMove', {cookie, id, length, rot});
}


(() => {
    const canvas = document.querySelector('canvas');
    // const { fillRect } = getBoard(canvas);
    sock = io();

    // fillRect(50, 50, 'green');
    sock.on('message', log); // what happens when you get a 'message'
    sock.on('cookie', save); // what happens when you get a 'cookie'
    sock.on('moveValidated', move);

    document.querySelector('#chat-form').addEventListener('submit', onChatSubmitted(sock));
})();
