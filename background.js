let timerInterval;
let startTime;
let codingTime = 0;
let timerRunning = false;
function startTimer() {
  if (!timerRunning) {
    startTime = Date.now();
    timerInterval = setInterval(function () {
      const currentTime = Date.now();
      codingTime = currentTime - startTime;
    }, 1000);
    timerRunning = true;
  }
}

function stopTimer() {
  if (timerRunning) {
    clearInterval(timerInterval);
    const timeInSeconds = Math.floor(codingTime / 1000);
    codingTime = 0;
    timerRunning = false;
    chrome.runtime.sendMessage({ action: 'updateTimer', time: timeInSeconds });
    sendTimeToWakatime(timeInSeconds, 'C++');
  }
}

function sendTimeToWakatime(timeInSeconds, language) {
  // Implement the logic to send the time and language information to the Wakatime API
  // Same code as before
  // Example code using cURL:
  // ...
}
console.log(`Loading: `);
