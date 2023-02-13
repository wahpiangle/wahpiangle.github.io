const socket = new WebSocket('ws://localhost:3000');
const switchBtn = document.getElementById('switchBtn');
const statusImage = document.querySelector('.online-status');
const takeNumberBtn = document.querySelector('.take-number-button');
const nowServingNumber = document.querySelector('.now-serving-number');
const lastNumberNumber = document.querySelector('.last-number-number');
const currentCounterNumber = document.querySelector('.counter1-current-number');

switchBtn.addEventListener('click', () => {
    window.location.href = '/src';
});

socket.onmessage = function (event) {
    let reader = new FileReader();
    reader.readAsText(event.data);
    reader.onload = function () {
        let trigger = reader.result;
        if (trigger === "callNext" && statusImage.getAttribute("src") === 'online.png' && parseInt(currentCounterNumber.innerHTML) === parseInt(nowServingNumber.innerHTML)-1) {
            currentCounterNumber.innerHTML = ('0000' + (parseInt(localStorage.getItem('currentCounterNumber')) + 1)).slice(-4);
            localStorage.setItem('currentCounterNumber', currentCounterNumber.innerHTML);
        }
        //trigger offline
        else if (statusImage.getAttribute("src") === 'online.png' && trigger == "offline") {
            statusImage.setAttribute("src", 'offline.png');
            localStorage.setItem('statusImage', 'offline.png');
            nowServingNumber.innerHTML = "Offline";
            localStorage.setItem('currentCounterNumber', currentCounterNumber.innerHTML);
            currentCounterNumber.innerHTML = 'Offline';
        }
        //trigger online
        else if (statusImage.getAttribute("src") === 'offline.png' && trigger == "online") {
            statusImage.setAttribute("src", 'online.png');
            localStorage.setItem('statusImage', 'online.png');
            if(localStorage.getItem('nowServingNumber')){
                nowServingNumber.innerHTML = localStorage.getItem('nowServingNumber')
            }else{
                nowServingNumber.innerHTML = "0001";
            }
            currentCounterNumber.innerHTML = localStorage.getItem('currentCounterNumber');
        }
        //complete current trigger
        else if (statusImage.getAttribute("src") === 'serving.png' && trigger == "completeCurrent") {
            statusImage.setAttribute("src", 'online.png');
            localStorage.setItem('statusImage', 'online.png');
            nowServingNumber.innerHTML = localStorage.getItem('nowServingNumber');
            currentCounterNumber.innerHTML = localStorage.getItem('currentCounterNumber');
        }
    }
};

window.addEventListener('load', () => {
    let storedSrc = localStorage.getItem(`statusImage`);
    let storedCurrentNumber = localStorage.getItem('nowServingNumber');
    let storedlastNumber = localStorage.getItem('lastNumberNumber');
    let storedCounterNumber = localStorage.getItem('currentCounterNumber');
    if (storedSrc) {
        statusImage.setAttribute('src', storedSrc);
        if (storedSrc === 'offline.png') {
            nowServingNumber.innerHTML = "Offline";
            currentCounterNumber.innerHTML = "Offline";
        }
    }
    if (storedCurrentNumber) {
        nowServingNumber.innerHTML = storedCurrentNumber;
    }
    if(storedlastNumber){
        lastNumberNumber.innerHTML = storedlastNumber;
    }
    if(storedCounterNumber){
        currentCounterNumber.innerHTML = storedCounterNumber;
    }
});

socket.addEventListener('open', (event) => {
    console.log('WebSocket connected');
});

takeNumberBtn.addEventListener('click', () => {
    if (currentCounterNumber.innerHTML !== nowServingNumber.innerHTML) {
        alert("Counter is currently not serving the number. Please wait for the counter to call next number.");
    }
    //to update number only if counter is online
    if (statusImage.getAttribute("src") === 'online.png' && currentCounterNumber.innerHTML === nowServingNumber.innerHTML) {
        nowServingNumber.innerText = ('0000' + (parseInt(nowServingNumber.innerText) + 1)).slice(-4);
        localStorage.setItem("nowServingNumber", nowServingNumber.innerText);
        localStorage.setItem("currentCounterNumber", currentCounterNumber.innerText);
        let lastNumber = nowServingNumber.innerText - 1;
        lastNumberNumber.innerText = ('0000' + lastNumber).slice(-4);
        localStorage.setItem("lastNumberNumber", lastNumberNumber.innerText);
        statusImage.setAttribute("src", "serving.png");
        nowServingNumber.innerText = "Waiting for Counter...";
    }
})