const switchBtn = document.getElementById('switchBtn');
const socket = new WebSocket('ws://localhost:3000');
const offlineButtonArray = document.querySelectorAll('.offline-button');
const completeCurrentButton = document.querySelector('.complete-current-button');
const callNextButton = document.querySelector('.call-next-button');

switchBtn.addEventListener('click', () => {
    window.location.href = '/client';
});

offlineButtonArray.forEach((button , index) => {
    button.addEventListener('click', (event) => {
        if(button.innerHTML === "Go Offline"){
            button.innerHTML = "Go Online";
            localStorage.setItem(`button-${index}`, "Go Online");
            socket.send("offline");
        }else if(button.innerHTML === "Go Online"){
            button.innerHTML = "Go Offline";
            localStorage.setItem(`button-${index}`, "Go Offline");
            socket.send("online");
        }
    });
});
window.addEventListener('load', () =>{
    offlineButtonArray.forEach((button, index) => {
        let storedInnerHTML = localStorage.getItem(`button-${index}`);
        if (storedInnerHTML) {
            button.innerHTML = storedInnerHTML;
        }
    });
})

completeCurrentButton.addEventListener('click', () =>{
    socket.send("completeCurrent");
});

callNextButton.addEventListener('click', () =>{
    socket.send("callNext");
})