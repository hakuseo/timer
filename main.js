const modeCheck = document.querySelector('.mode-check');
const stopBtn = document.querySelector('.stop');
const meatballs = document.querySelector('.meatballs');
const navBar = document.querySelector('.nav-bar');
const countdownEl = document.querySelector('.countdown');
const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const audio = document.querySelector('.audio');
const fifteen = document.getElementById(15);
const thirty = document.getElementById(30);
const fortyFive = document.getElementById(45);
const startTime = 'startTimeSet';
const currentTime = 'currentTimeSet';

let currentTimeSet = [];
let startTimeSet = [];

function saveTime() {
  localStorage.setItem(currentTime, JSON.stringify(currentTimeSet));
  localStorage.setItem(startTime, JSON.stringify(startTimeSet));
}

modeCheck.addEventListener('click', (e) => {
  if (e.target.checked) {
    document.documentElement.setAttribute('color-theme', 'dark');
  } else {
    document.documentElement.setAttribute('color-theme', 'light');
  }
});

meatballs.addEventListener('click', () => {
  navBar.classList.toggle('nav-bar-block');
});

function startTimeEvent(time) {
  if (time !== '') {
    time = +time;
    let timeSec = time * 60;
    const startTimeObject = {
      time,
      timeSec,
    };
    startTimeSet.splice(0, 1, startTimeObject);
    currentTimeSet.splice(0, 1, startTimeObject.timeSec);
    countdownEl.innerText = `${time}:00`;
    navBar.classList.remove('nav-bar-block');
    saveTime();
  }
}

function navBarClickEvent(event) {
  const timer = event.target.id;
  startTimeEvent(timer);
}

startBtn.addEventListener('click', startTimer);

function startTimer(currentTime) {
  let timeMin = startTimeSet[0].time;
  currentTime = currentTimeSet[0];
  let countDown = setInterval(function () {
    let min = Math.floor(currentTime / 60);
    let sec = currentTime % 60;
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;
    countdownEl.innerHTML = `${min}:${sec}`;
    currentTimeSet.splice(0, 1, currentTime);
    currentTime--;
    saveTime();
    if (min == 0 && sec == 0) {
      clearInterval(countDown);
      audio.play();
      audio.volume = 0.2;
      setTimeout(() => {
        currentTime = startTimeSet[0].timeSec;
        let min = Math.floor(currentTime / 60);
        let sec = currentTime % 60;
        min = min < 10 ? '0' + min : min;
        sec = sec < 10 ? '0' + sec : sec;
        countdownEl.innerHTML = `${min}:${sec}`;
        currentTimeSet.splice(0, 1, currentTime);
        saveTime();
        startBtn.style.visibility = 'visible';
        pauseBtn.style.visibility = 'hidden';
      }, 1800);
    }
  }, 1000);
  startBtn.style.visibility = 'hidden';
  pauseBtn.style.visibility = 'visible';
  fifteen.disabled = true;
  thirty.disabled = true;
  fortyFive.disabled = true;

  pauseBtn.addEventListener('click', () => {
    clearInterval(countDown);
    startBtn.style.visibility = 'visible';
    pauseBtn.style.visibility = 'hidden';
    fifteen.disabled = false;
    thirty.disabled = false;
    fortyFive.disabled = false;
  });

  stopBtn.addEventListener(
    'click',
    () => {
      clearInterval(countDown);
      timeMin = timeMin;
      currentTime = startTimeSet[0].timeSec;
      currentTimeSet.splice(0, 1, currentTime);
      saveTime();
      countdownEl.innerText = `${timeMin}:00`;
      startBtn.style.visibility = 'visible';
      pauseBtn.style.visibility = 'hidden';
      fifteen.disabled = false;
      thirty.disabled = false;
      fortyFive.disabled = false;
    },
    1000,
  );
}

function loadStartTime() {
  const loadedStartTime = localStorage.getItem(startTime);
  const loadedCurrentTime = localStorage.getItem(currentTime);
  if (loadedStartTime !== null) {
    const parsedTime = JSON.parse(loadedStartTime);
    const parsedCurrentTime = JSON.parse(loadedCurrentTime);
    parsedTime.forEach(function (time) {
      countdownEl.innerText = `${time.time}:00`;
      startTimeEvent(time.time);
    });

    parsedCurrentTime.forEach(function (current) {
      let min = Math.floor(current / 60);
      let sec = current % 60;
      min = min < 10 ? '0' + min : min;
      sec = sec < 10 ? '0' + sec : sec;
      countdownEl.innerHTML = `${min}:${sec}`;
      currentTimeSet.splice(0, 1, current);
      // console.log(current, min, sec);
    });
  }
}

function init() {
  loadStartTime();

  navBar.addEventListener('click', navBarClickEvent);
  if (startTimeSet[0] === undefined) {
    startTimeEvent(30);
  }
}

init();

// function setIntervalTimer() {
//   if (timeCondition.includes(currentTime)) {

//   }
// }

//   let timeMin = startTimeSet[0].time;
//   let timeSec = startTimeSet[0].timeSec;
//   currentTime = currentTimeSet[0];
//   const timeCondition = [undefined, 900, 1800, 2700];
//   if (timeCondition.includes(currentTime)) {
//     let countDown = setInterval(function () {
//       let min = Math.floor(timeSec / 60);
//       let sec = timeSec % 60;
//       min = min < 10 ? '0' + min : min;
//       sec = sec < 10 ? '0' + sec : sec;
//       countdownEl.innerHTML = `${min}:${sec}`;
//       timeSec--;
//       currentTimeSet.splice(0, 1, timeSec);
//       saveTime();

//       if (min == 0 && sec == 0) {
//         timeSec;
//         audio.play();
//         audio.volume = 0.2;
//         clearInterval(countDown);
//         startBtn.style.visibility = 'visible';
//         pauseBtn.style.visibility = 'hidden';
//       }
//     }, 1000);

//     startBtn.style.visibility = 'hidden';
//     pauseBtn.style.visibility = 'visible';
//     fifteen.disabled = true;
//     thirty.disabled = true;
//     fortyFive.disabled = true;

//     pauseBtn.addEventListener('click', () => {
//       clearInterval(countDown);
//       startBtn.style.visibility = 'visible';
//       pauseBtn.style.visibility = 'hidden';
//       fifteen.disabled = false;
//       thirty.disabled = false;
//       fortyFive.disabled = false;
//     });

//     stopBtn.addEventListener(
//       'click',
//       () => {
//         clearInterval(countDown);
//         timeMin = timeMin;
//         currentTime = startTimeSet[0].timeSec;
//         currentTimeSet.splice(0, 1, currentTime);
//         saveTime();
//         countdownEl.innerText = `${timeMin}:00`;
//         startBtn.style.visibility = 'visible';
//         pauseBtn.style.visibility = 'hidden';
//         fifteen.disabled = false;
//         thirty.disabled = false;
//         fortyFive.disabled = false;
//       },
//       1000,
//     );
//   }
