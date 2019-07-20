// Timer
let timer;
let remaining;
let isStarted = false;
let led = document.getElementById("led");
let label = document.getElementById("label");
let timerLabel = document.getElementById("timer");

// Start function
function start() {
  setStatus(true);
  clearTimeout(timer);
  clearInterval(remaining);

  let datetime_picker = document.getElementById("datetime-picker");

  let now = new Date(); // Get current date and time

  if (datetime_picker.value === "") {
    injectTheScript();
    setStatus(false);
  } else {
    let selectedDate = new Date(datetime_picker.value);
    let startTime = selectedDate - now; // Set Start Time

   
    

    timer = setTimeout(function() {
      injectTheScript();
      setStatus(false);
    }, startTime);

    remaining = setInterval(() => {
      let thisTime = new Date();
      let remainingTime = selectedDate - thisTime;
      timerLabel.innerHTML  = " - " + msToTime(remainingTime);
    }, 1000);


  }
}

function msToTime(s) {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return hrs + ':' + mins + ':' + secs;
}


// Stop function
function stop() {
  clearTimeout(timer);
  clearInterval(remaining);
  setStatus(false);
}

function setStatus(status) {
  switch (status) {
    case true:
      led.classList.remove("red");
      led.classList.add("green");
      label.innerHTML = "Started";
      break;
    case false:
      led.classList.remove("green");
      led.classList.add("red");
      label.innerHTML = "Stopped";
      clearInterval(remaining);
      timerLabel.innerHTML = "";
      break;
  }
}

// Inject Trigger to the current active Web Page
function injectTheScript() {
  let xpath = document.getElementById("xpath-input").value || "";
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.executeScript({
      code: `
      (function () {
        let btn = new XPathEvaluator()
        .createExpression("${xpath}")
        .evaluate(document, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
        btn.click();
       })();
      `
    });
  });
}

document.getElementById("startBtn").addEventListener("click", start);
document.getElementById("stopBtn").addEventListener("click", stop);
