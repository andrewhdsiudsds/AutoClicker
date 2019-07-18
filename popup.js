// Timer
var timer;
var isStarted = false;
var led = document.getElementById("led");
var label = document.getElementById("label");

// Start function
function start(startTime) {
  setStatus(true);
  var now = new Date(); // Get current date and time
  var startTime =
    new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0, 0) -
    now; // Set Start Time

  timer = setTimeout(function() {
    injectTheScript();
  }, startTime);
}

// Stop function
function stop() {
  clearTimeout(timer);
  setStatus(false);
}

function setStatus(status) {
  switch (status) {
    case true:
      led.classList.remove("red");
      led.classList.add("green");
      break;
    case false:
      led.classList.remove("green");
      led.classList.add("red");
      break;
  }
}

// Inject Trigger to the current active Web Page
function injectTheScript() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    // query the active tab, which will be only one tab
    //and inject the script in it
    chrome.tabs.executeScript(tabs[0].id, { file: "content.js" });
    
  });
}

document.getElementById("startBtn").addEventListener("click", start);
document.getElementById("stopBtn").addEventListener("click", stop);
